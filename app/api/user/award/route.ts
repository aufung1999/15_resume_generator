import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import Award from "@/models/Award";
import { AwardState } from "@/slices/awardSlice";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    console.log("user/Award Get");

    await db.connect();
    const exist = await Award.find({
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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  console.log("session?.user?.email: " + session?.user?.email);
  if (session) {
    const body = await req.json();
    console.log("body: " + JSON.stringify(body, null, 1));

    await db.connect();
    body.map(async (each: AwardState) => {
      const { index, AwardName, AwardBy, Date, AwardDescription } = each;

      //use the email from "Next-auth" to find the data in "Award" collection

      const exist = await Award.findOne({
        email: session?.user?.email,
        index: index,
      });
      //***/

      //if "Award" collction has the data
      if (exist) {
        const filter = { email: session?.user?.email, index: index };
        const update = {
          AwardName: AwardName,
          AwardBy: AwardBy,
          Date: Date,
          AwardDescription: AwardDescription,
        };

        // `doc` is the document _after_ `update` was applied because of
        // `new: true`
        await Award.findOneAndUpdate(filter, update, {
          new: true,
        });
      }
      //***/

      //if "Award" collction does NOT have the data
      if (!exist) {
        const work = await new Award({
          email: session?.user?.email,
          index: index,
          AwardName: AwardName,
          AwardBy: AwardBy,
          Date: Date,
          AwardDescription: AwardDescription,
        });

        await work.save();
      }
      //***/
    });

    await db.disconnect();
    return NextResponse.json({ message: "Hello" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
