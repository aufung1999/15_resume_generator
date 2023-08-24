import User from "@/models/User";
import db from "@/utils/db";

import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Contact from "@/models/Contact";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    // console.log("Get");

    await db.connect();
    const exist = await Contact.findOne({
      email: session?.user?.email,
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

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Signed in
    // console.log("Session", JSON.stringify(session?.user?.email, null, 2));
    const body = await req.json();
    // console.log(body);
    const {
      FirstName,
      LastName,
      PhoneNumber,
      Country,
      City,
      State,
      ZipCode,
      Email,
      Portfolio,
      LinkedIn,
      GitHub,
      OpentoWork,
      Sponsorship,
    } = body;

    //use the email from "Next-auth" to find the data in "Contact" collection
    await db.connect();
    const exist = await Contact.findOne({
      email: session?.user?.email,
    });
    await db.disconnect();
    //***/

    //if "Contact" collction has the data
    if (exist) {
      const filter = { email: session?.user?.email };
      const update = {
        FirstName: FirstName,
        LastName: LastName,
        PhoneNumber: PhoneNumber,
        Country: Country,
        City: City,
        State: State,
        ZipCode: ZipCode,
        Email: Email,
        Portfolio: Portfolio,
        LinkedIn: LinkedIn,
        GitHub: GitHub,
        OpentoWork: OpentoWork,
        Sponsorship: Sponsorship,
      };

      // `doc` is the document _after_ `update` was applied because of
      // `new: true`
      await Contact.findOneAndUpdate(filter, update, {
        new: true,
      });

      return NextResponse.json({ message: "Contact Updated" });
    }
    //***/

    //if "Contact" collction does NOT have the data
    const contact = await new Contact({
      email: session?.user?.email,
      FirstName: FirstName,
      LastName: LastName,
      PhoneNumber: PhoneNumber,
      Country: Country,
      City: City,
      State: State,
      ZipCode: ZipCode,
      Email: Email,
      Portfolio: Portfolio,
      LinkedIn: LinkedIn,
      GitHub: GitHub,
      OpentoWork: OpentoWork,
      Sponsorship: Sponsorship,
    });

    await contact.save();
    //***/

    return NextResponse.json({ message: "Contact Saved" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
