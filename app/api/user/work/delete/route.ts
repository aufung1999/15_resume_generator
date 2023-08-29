import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import Work from "@/models/Work";

export const dynamic = "force-dynamic";
const mongoose = require("mongoose");

const MONGODB_URL: string = process.env.MONGODB_URL as string;

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    const body = await req.json();
    
    await db.connect();
    await mongoose.connect(MONGODB_URL);

    const query = { index: body, email: session?.user?.email };
    await Work.deleteOne(query)
      .then(function () {
        console.log("Data deleted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });

    await db.disconnect();
    return NextResponse.json({ message: "Deleted" });
  }
}
