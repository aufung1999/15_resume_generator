import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    const body = await req.json();
    console.log("body: " + JSON.stringify(body, null, 1));
    return NextResponse.json({ message: "Hello" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
