import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import db from "@/utils/db";
import Contact from "@/models/Contact";
import Work from "@/models/Work";
import Education from "@/models/Education";
import Award from "@/models/Award";
import Objective from "@/models/Objective";
import Skill from "@/models/Skill";
import Login from "@/components/RootPage/Login";
import Register from "@/components/RootPage/Register";
import Description from "@/components/RootPage/Description";
import Intro_1_Comparison from "@/components/RootPage/Intro_1_Comparison";
import Intro_2_Resumes_parts from "@/components/RootPage/Intro_2_Resumes_parts";
import Banner from "@/components/RootPage/Banner";

export default async function Home() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let clientData,
    contactData,
    workData,
    educationData,
    awardData,
    objectiveData,
    skillData;
  //check if "Authenticated"
  if (session) {
    await db.connect();
    //fetch Contact
    contactData = await Contact.findOne({
      email: session?.user?.email,
    });
    if (contactData) {
      contactData = db.convertDocToObj(contactData);
    }
    //fetch Work
    workData = await Work.find({
      email: session?.user?.email,
    });
    if (workData) {
      workData = workData.map((each: any) => db.convertDocToObj(each));
    }
    //fetch Education
    educationData = await Education.find({
      email: session?.user?.email,
    });
    if (educationData) {
      educationData = educationData.map((each: any) =>
        db.convertDocToObj(each)
      );
    }
    //fetch Award
    awardData = await Award.find({
      email: session?.user?.email,
    });
    if (awardData) {
      // awardData = awardData.map((each:any) => db.convertDocToObj(each));
      awardData = awardData.map((each: any) => db.convertDocToObj(each));
    }
    //fetch Objective
    objectiveData = await Objective.find({
      email: session?.user?.email,
    });
    if (objectiveData) {
      // objectiveData = objectiveData.map((each:any) => db.convertDocToObj(each));
      objectiveData = objectiveData.map((each: any) =>
        db.convertDocToObj(each)
      );
    }
    //fetch Skill
    skillData = await Skill.find({
      email: session?.user?.email,
    });
    if (skillData) {
      // skillData = skillData.map((each:any) => db.convertDocToObj(each));
      skillData = skillData.map((each: any) => db.convertDocToObj(each));
    }

    clientData = {
      contact: contactData,
      work: workData,
      education: educationData,
      award: awardData,
      skill: skillData,
      objective: objectiveData,
    };
  }

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="mx-10 z-10 w-full items-center justify-between text-sm lg:flex  ">
        <Description />
      </div>
      <div className="mx-10 z-10 w-full items-center justify-between text-sm lg:flex  ">
        <Banner />
        <Intro_1_Comparison />
        <Intro_2_Resumes_parts />
      </div>
    </main>
  );
}
