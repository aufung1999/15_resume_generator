import db from "@/utils/db";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Resume from "@/models/Resume";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
const mongoose = require("mongoose");

const MONGODB_URL: string = process.env.MONGODB_URL as string;

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Signed in
    const body = await req.json();
    // console.log(body);
    const { resumeID } = body;

    await db.connect();
    await mongoose.connect(MONGODB_URL);
    
    if (resumeID) {
      const filter = { _id: resumeID };

      await Resume.deleteOne(filter);
      await db.disconnect();
      return NextResponse.json({ message: "Resume Deleted" });
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
