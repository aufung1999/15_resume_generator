import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import Objective from "@/models/Objective";
import { ObjectiveState } from "@/slices/objectiveSlice";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    console.log("user/Award Get");

    await db.connect();
    const exist = await Objective.find({
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
  console.log("session?.user?.email: " + session?.user?.email);
  if (session) {
    const body = await req.json();
    console.log("body: " + JSON.stringify(body, null, 1));

    await db.connect();
    body.map(async (each: ObjectiveState) => {
      const { index, ObjectiveDes } = each;

      //use the email from "Next-auth" to find the data in "Objective" collection

      const exist = await Objective.findOne({
        email: session?.user?.email,
        index: index,
      });

      //***/

      //if "Objective" collction has the data
      if (exist) {
        const filter = { email: session?.user?.email, index: index };
        const update = {
          ObjectiveDes: ObjectiveDes,
        };

        // `doc` is the document _after_ `update` was applied because of
        // `new: true`
        await Objective.findOneAndUpdate(filter, update, {
          new: true,
        });

      }
      //***/

      //if "Objective" collction does NOT have the data
      if (!exist) {
        const work = await new Objective({
          email: session?.user?.email,
          index: index,
          ObjectiveDes: ObjectiveDes,
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
