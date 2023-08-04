import db from "@/utils/db";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Resume from "@/models/Resume";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Signed in
    const body = await req.json();
    // console.log(body);
    const { resumeID } = body;

    db.connect();
    if (resumeID) {
      const filter = { _id: resumeID };

      db.disconnect();
      await Resume.deleteOne(filter);
      return NextResponse.json({ message: "Resume Deleted" });
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
