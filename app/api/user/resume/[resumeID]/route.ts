import db from "@/utils/db";
import bcrypt from "bcryptjs";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Resume from "@/models/Resume";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: NextApiRequest,
  { params }: { params: string },
  res: NextApiResponse
) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    const resumeID = params.resumeID;
    console.log(resumeID);

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
