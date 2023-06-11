import User from "@/models/User";
import data from "@/utils/data";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  return NextResponse.json({ message: "Hello" });
}
