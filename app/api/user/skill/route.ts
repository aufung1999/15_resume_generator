import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/utils/db";
import Skill from "@/models/Skill";
import { SkillsState } from "@/slices/skillsSlice";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function GET(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    console.log("user/Skill Get");

    await db.connect();
    const exist = await Skill.find({
      email: session?.user?.email,
    }).exec();
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

export async function POST(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  console.log("session?.user?.email: " + session?.user?.email);
  if (session) {
    const body = await req.json();
    console.log("body: " + JSON.stringify(body, null, 1));

    body.map(async (each: SkillsState) => {
      const { index, term, Skill_list } = each;

      //use the email from "Next-auth" to find the data in "Skill" collection
      await db.connect();
      const exist = await Skill.findOne({
        email: session?.user?.email,
        index: index,
      });
      await db.disconnect();
      //***/

      //if "Skill" collction has the data
      if (exist) {
        console.log("exist: " + JSON.stringify(exist, null, 1));
        const filter = { email: session?.user?.email };
        const update = {
          index: index,
          term: term,
          skill: Skill_list,
        };

        // `doc` is the document _after_ `update` was applied because of
        // `new: true`
        await Skill.findOneAndUpdate(filter, update, {
          new: true,
        });

        return NextResponse.json({ message: "Updated" });
      }
      //***/

      //if "Skill" collction does NOT have the data
      const skill = await new Skill({
        email: session?.user?.email,
        index: index,
        term: term,
        Skill_list: Skill_list,
      });

      await skill.save();
      //***/
    });

    return NextResponse.json({ message: "Hello" });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
