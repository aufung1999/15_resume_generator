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
    console.log(body);
    const { image, job_details } = body;
    const resume = await new Resume({
      email: session?.user?.email,
      HTMLDIVElement: image,
      Job_Details: job_details,
    });
    await resume.save();

    return NextResponse.json({ message: "Resume Saved" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
