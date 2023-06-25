import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import SkillClient from "./Components/Client";
import Skill from "@/models/Skill";

export default async function Page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let skillData;
  //check if "Authenticated", which means "Logged In?"
  if (session) {
    await db.connect();
    skillData = JSON.parse(
      JSON.stringify(
        await Skill.find({
          email: session?.user?.email,
        })
      )
    );
    if (skillData) {
      // skillData = skillData.map((each) => db.convertDocToObj(each));
      skillData = JSON.parse(JSON.stringify(skillData));
    }
  }
  return (
    <div>
      <SkillClient data={skillData} />
    </div>
  );
}
