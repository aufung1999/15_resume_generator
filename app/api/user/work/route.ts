import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import Work from "@/models/Work";
import { WorkExpState } from "@/slices/workSlice";

export const dynamic = "force-dynamic";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function GET(req: NextRequest, res: NextApiResponse) {
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

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    const body = await req.json();

    await db.connect();
    await Promise.all(
      body.map(async (each: WorkExpState) => {
        await mongoose.connect(MONGODB_URL);
        const {
          index,
          CompanyName,
          Position,
          current,
          StartDate,
          EndDate,
          JobDescription,
        } = each;

        //use the email from "Next-auth" to find the data in "Work" collection

        const exist = await Work.findOne({
          email: session?.user?.email,
          index: index,
        });

        console.log("exist: " + exist);
        //***/

        //if "Work" collction has the data
        if (exist) {
          const filter = { email: session?.user?.email, index: index };
          const update = {
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
        }
        //***/

        //if "Work" collction does NOT have the data
        if (!exist) {
          const work = await new Work({
            email: session?.user?.email,
            index: index,
            CompanyName: CompanyName || null,
            Position: Position || null,
            current: current || null,
            StartDate: StartDate || null,
            EndDate: EndDate || null,
            JobDescription: JobDescription || null,
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
