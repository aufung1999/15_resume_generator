import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import APIKey from "@/models/APIKey";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

// export async function GET(req: NextRequest, res: NextApiResponse) {
//   const session = await getServerSession(authOptions);
//   if (session) {
//     // Signed in
//     console.log("user/APIKey Get");

//     await db.connect();
//     const exist = await APIKey.find({
//       email: session?.user?.email,
//     }).exec();
//     await db.disconnect();

//     if (exist) {
//       return NextResponse.json(exist);
//     }
//   } else {
//     // Not Signed in
//     res.status(401);
//   }
//   res.end();
// }

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    const body = await req.json();

    const { API_Key } = body;
    console.log(body);


    await db.connect();
    const exist = await APIKey.findOne({
      email: session?.user?.email,
      api_key: API_Key,
    });
    //***/

    //if "APIKey" collction has the data
    if (exist) {
      const filter = { email: session?.user?.email };
      const update = {
        api_key: API_Key,
      };

      // `doc` is the document _after_ `update` was applied because of
      // `new: true`
      await APIKey.findOneAndUpdate(filter, update, {
        new: true,
      });
    }
    //***/

    //if "APIKey" collction does NOT have the data
    if (!exist) {
      const apikey = await new APIKey({
        email: session?.user?.email,
        api_key: API_Key,
      });

      await apikey.save();
    }
    await db.disconnect();

    return NextResponse.json({ message: "API key save" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
