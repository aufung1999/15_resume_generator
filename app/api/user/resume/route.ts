import db from "@/utils/db";

import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Resume from "@/models/Resume";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Signed in
    const body = await req.json();
    // console.log(body);
    const {
      image,
      stage_3,
      matches,
      unmatches,
      job_details,
      resumeID,
      work,
      project,
      skill,
    } = body;

    console.log("--------------------------");
    console.log("resumeID: " + resumeID);
    console.log(work);
    console.log("--------------------------");

    await db.connect();
    if (resumeID) {
      console.log("unmatches: " + unmatches);
      const filter = { email: session?.user?.email, _id: resumeID };
      const update = {
        HTMLDIVElement: image,
        Stage_3: stage_3,
        Matches: matches,
        Unmatches: unmatches,
        Work: work,
        Project: project,
        Skill: skill,
      };

      await Resume.findOneAndUpdate(filter, update, {
        new: true,
      });
      await db.disconnect();
      return NextResponse.json({ message: "Resume Updated" });
    }

    if (resumeID === null || resumeID === undefined) {
      const exist: any = await Resume.findOne({
        email: session?.user?.email,
        Job_Details: job_details,
      });

      console.log(exist);

      if (exist) {
        const filter = {
          email: session?.user?.email,
          Job_Details: job_details,
        };
        const update = {
          HTMLDIVElement: image,
          Stage_3: stage_3,
          Matches: matches,
          Unmatches: unmatches,
          Work: work,
          Project: project,
          Skill: skill,
        };

        await Resume.findOneAndUpdate(filter, update, {
          new: true,
        });
        await db.disconnect();
        return NextResponse.json({ message: "Resume Updated" });
      }

      if (!exist) {
        const resume = await new Resume({
          email: session?.user?.email,
          HTMLDIVElement: image,
          Stage_3: stage_3,
          Matches: matches,
          Unmatches: unmatches,
          Job_Details: job_details,
          Response: "",
          Work: work,
          Project: project,
          Skill: skill,
        });
        await resume.save();
        await db.disconnect();
        return NextResponse.json({ message: "Resume Saved" });
      }
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
