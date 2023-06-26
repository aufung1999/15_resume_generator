import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import Education from "@/models/Education";
import { EducationState } from "@/slices/educationSlice";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function GET(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
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

export async function POST(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  console.log("session?.user?.email: " + session?.user?.email);
  if (session) {
    const body = await req.json();
    console.log("body: " + JSON.stringify(body, null, 1));

    body.map(async (each: EducationState) => {
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
      await db.connect();
      const exist = await Education.findOne({
        email: session?.user?.email,
        index: index,
      });
      await db.disconnect();
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
      if (exist) {
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
    });

    return NextResponse.json({ message: "Hello" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
