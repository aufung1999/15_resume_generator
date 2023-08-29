import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import Project from "@/models/Project";
import { ProjectState } from "@/slices/projectsSlice";

export const dynamic = "force-dynamic";
const mongoose = require("mongoose");

const MONGODB_URL: string = process.env.MONGODB_URL as string;

export async function GET(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in

    await db.connect();
    const exist = await Project.find({
      email: session?.user?.email,
    }).exec();
    await db.disconnect();

    if (exist) {
      return NextResponse.json(exist);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  // console.log('session?.user?.email: ' + session?.user?.email)
  if (session) {
    const body = await req.json();
    // console.log("body: " + JSON.stringify(body, null, 1));

    await db.connect();
    await Promise.all(
      body.map(async (each: ProjectState) => {
        await mongoose.connect(MONGODB_URL);
        const { index, ProjectName, Techniques, ProjectDescription } = each;

        //use the email from "Next-auth" to find the data in "Project" collection

        const exist = await Project.findOne({
          email: session?.user?.email,
          index: index,
        });
        //***/

        //if "Project" collction has the data
        if (exist) {
          console.log("Techniques: " + Techniques);
          const filter = { email: session?.user?.email, index: index };
          const update = {
            ProjectName: ProjectName,
            Techniques: Techniques,
            ProjectDescription: ProjectDescription,
          };

          // `doc` is the document _after_ `update` was applied because of
          // `new: true`
          await Project.findOneAndUpdate(filter, update, {
            new: true,
          });
        }
        //***/

        //if "Project" collction does NOT have the data
        if (!exist) {
          const project = await new Project({
            email: session?.user?.email,
            index: index,
            ProjectName: ProjectName || null,
            Techniques: Techniques || null,
            ProjectDescription: ProjectDescription || null,
          });

          await project.save();
        }
        //***/
      })
    );

    await db.disconnect();
    return NextResponse.json({ message: "Updaed" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
