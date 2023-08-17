import db from "@/utils/db";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Resume from "@/models/Resume";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function GET(
  req: NextRequest,
  { params }: { params: { resumeID: string } },
  res: NextApiResponse
) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    const resumeID = params.resumeID;
    // console.log(resumeID);

    await db.connect();
    const exist = await Resume.findOne({
      email: session?.user?.email,
      _id: resumeID,
    });
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
    // Signed in
    const body = await req.json();
    // console.log(body);
    const { resumeID, response } = body;

    db.connect();
    if (resumeID) {
      console.log("resumeID: " + resumeID);
      console.log("response: " + response);
      const filter = { _id: resumeID };
      const update = {
        Response: response,
      };

      db.disconnect();
      await Resume.findOneAndUpdate(filter, update, {
        new: true,
      });
      return NextResponse.json({ message: "Response Value Updated" });
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
