import db from "@/utils/db";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Resume from "@/models/Resume";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Signed in
    const body = await req.json();
    const { resumeID, job_details } = body;
    console.log(resumeID);

    await db.connect();
    if (resumeID) {
      const filter = { _id: resumeID };
      const update = {
        Job_Details: JSON.stringify(job_details),
      };

      await db.disconnect();
      await Resume.findOneAndUpdate(filter, update, {
        new: true,
      });
      return NextResponse.json({ message: "job Details Updated" });
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
