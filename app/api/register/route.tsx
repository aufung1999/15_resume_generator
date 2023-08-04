import User from "@/models/User";
import db from "@/utils/db";

import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  await db.connect();
  const exist = await User.findOne({
    email: email,
  });
  await db.disconnect();

  if (exist) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  await user.save();

  return NextResponse.json(user);
}
