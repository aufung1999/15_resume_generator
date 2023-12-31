import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import Education from "@/models/Education";
import { EducationState } from "@/slices/educationSlice";

export const dynamic = "force-dynamic";
const mongoose = require("mongoose");

const MONGODB_URL: string = process.env.MONGODB_URL as string;

export async function GET(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    console.log("user/Education Get");

    await db.connect();
    const exist = await Education.find({
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
  // console.log("session?.user?.email: " + session?.user?.email);
  if (session) {
    const body = await req.json();

    await db.connect();
    await Promise.all(
      body.map(async (each: EducationState) => {
        await mongoose.connect(MONGODB_URL);
        const {
          index,
          SchoolName,
          Degree,
          Subject,
          current,
          StartDate,
          EndDate,
        } = each;

        //use the email from "Next-auth" to find the data in "Education" collection
        const exist = await Education.findOne({
          email: session?.user?.email,
          index: index,
        });
        //***/

        //if "Education" collction has the data
        if (exist) {
          const filter = { email: session?.user?.email };
          const update = {
            index: index,
            SchoolName: SchoolName,
            Degree: Degree,
            Subject: Subject,
            current: current,
            StartDate: StartDate,
            EndDate: EndDate,
          };

          // `doc` is the document _after_ `update` was applied because of
          // `new: true`
          await Education.findOneAndUpdate(filter, update, {
            new: true,
          });
        }
        //***/

        //if "Education" collction does NOT have the data
        if (!exist) {
          const work = await new Education({
            email: session?.user?.email,
            index: index,
            SchoolName: SchoolName,
            Degree: Degree,
            Subject: Subject,
            current: current,
            StartDate: StartDate,
            EndDate: EndDate,
          });

          await work.save();
        }
        //***/
      })
    );
    await db.disconnect();

    return NextResponse.json({ message: "Hello" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
