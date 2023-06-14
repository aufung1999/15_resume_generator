import User from "@/models/User";
import db from "@/utils/db";

import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Contact from "@/models/Contact";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session?.user?.email, null, 2));
    const body = await req.json();
    console.log(body);
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
    } = body;

    await db.connect();
    const exist = await Contact.findOne({
      email: session?.user?.email,
    });
    await db.disconnect();

    if (exist) {
    //   console.log("exist");
    //   console.log(exist.Email);

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
      };

      // `doc` is the document _after_ `update` was applied because of
      // `new: true`
      await Contact.findOneAndUpdate(filter, update, {
        new: true,
      });

      return NextResponse.json({ message: "Hello" });
    }

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
    });

    await contact.save();

    return NextResponse.json({ message: "Hello" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();

  //   const { name, email, password } = body;

  //   if (!name || !email || !password) {
  //     return new NextResponse("Missing Fields", { status: 400 });
  //   }

  //   await db.connect();
  //   const exist = await User.findOne({
  //     email: email,
  //   });
  //   await db.disconnect();

  //   if (exist) {
  //     throw new Error("Email already exists");
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = await new User({
  //     name: name,
  //     email: email,
  //     password: hashedPassword,
  //   });

  //   await user.save();
}
