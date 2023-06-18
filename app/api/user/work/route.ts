import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import Work from "@/models/Work";
import { WorkExpState } from "@/slices/workSlice";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function GET(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    // console.log("user/Work Get");

    await db.connect();
    const exist = await Work.find({
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
  // console.log('session?.user?.email: ' + session?.user?.email)
  if (session) {
    const body = await req.json();
    // console.log("body: " + JSON.stringify(body, null, 1));

    body.map(async (each: WorkExpState) => {
      const {
        index,
        CompanyName,
        Position,
        current,
        StartDate,
        EndDate,
        JobDescription,
      } = each;

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
          EndDate: EndDate,
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
        EndDate: EndDate,
        JobDescription: JobDescription,
      });

      await work.save();
      //***/
    });

    return NextResponse.json({ message: "Hello" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
