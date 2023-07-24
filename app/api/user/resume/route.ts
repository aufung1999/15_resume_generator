import db from "@/utils/db";

import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Resume from "@/models/Resume";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Signed in
    const body = await req.json();
    // console.log(body);
    const { image, stage_3, matches, unmatches, job_details, resumeID } = body;

    db.connect();
    if (resumeID) {
      console.log("resumeID: " + resumeID);
      console.log("unmatches: " + unmatches);
      const filter = { email: session?.user?.email, _id: resumeID };
      const update = {
        HTMLDIVElement: image,
        Stage_3: stage_3,
        Matches: matches,
        Unmatches: unmatches,
      };

      db.disconnect();
      await Resume.findOneAndUpdate(filter, update);
      return NextResponse.json({ message: "Resume Updated" });
    }

    if (!resumeID) {
      const resume = await new Resume({
        email: session?.user?.email,
        HTMLDIVElement: image,
        Stage_3: stage_3,
        Matches: matches,
        Unmatches: unmatches,
        Job_Details: job_details,
        Response: "false",
      });
      db.disconnect();
      await resume.save();
      return NextResponse.json({ message: "Resume Saved" });
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
