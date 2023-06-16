import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import Work from "@/models/Work";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    const body = await req.json();
    console.log("body: " + JSON.stringify(body, null, 1));

    const {
      index,
      CompanyName,
      Position,
      current,
      StartDate,
      editEndDate,
      JobDescription,
    } = body;

    //use the email from "Next-auth" to find the data in "Contact" collection
    await db.connect();
    const exist = await Work.findOne({
      email: session?.user?.email,
    });
    await db.disconnect();
    //***/

    //if "Contact" collction has the data
    if (exist) {
      const filter = { email: session?.user?.email };
      const update = {
        index: index,
        CompanyName: CompanyName,
        Position: Position,
        current: current,
        StartDate: StartDate,
        editEndDate: editEndDate,
        JobDescription: JobDescription,
      };

      // `doc` is the document _after_ `update` was applied because of
      // `new: true`
      await Work.findOneAndUpdate(filter, update, {
        new: true,
      });

      return NextResponse.json({ message: "Hello" });
    }
    //***/

    //if "Contact" collction does NOT have the data
    const work = await new Work({
      email: session?.user?.email,
      index: index,
      CompanyName: CompanyName,
      Position: Position,
      current: current,
      StartDate: StartDate,
      editEndDate: editEndDate,
      JobDescription: JobDescription,
    });

    await work.save();
    //***/

    return NextResponse.json({ message: "Hello" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
