import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import db from "@/utils/db";
import Resume from "@/models/Resume";

import Contact from "@/models/Contact";
import Work from "@/models/Work";
import Education from "@/models/Education";
import Award from "@/models/Award";
import Objective from "@/models/Objective";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import UserClient from "./Components/Client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  let resumeData,
    clientData,
    contactData,
    workData,
    educationData,
    awardData,
    objectiveData,
    skillData,
    projectData,
    API_Key;

  if (session) {
    await db.connect();
    resumeData = JSON.parse(
      JSON.stringify(
        await Resume.find({
          email: session?.user?.email,
        }).sort({ createdAt: "descending" })
      )
    );
    if (resumeData) {
      resumeData.map((each) => db.convertDocToObj(each));
    }
    //fetch Contact
    contactData = await Contact.findOne({
      email: session?.user?.email,
    });
    if (contactData) {
      contactData = db.convertDocToObj(contactData);
      // const { _id, createdAt, updatedAt, __v, ...rest } = contactData._doc;
      // console.log("rest: " + JSON.stringify(rest, null, 1));
    }
    //fetch Work
    workData = await Work.find({
      email: session?.user?.email,
    });
    if (workData) {
      workData = workData.map((each) => db.convertDocToObj(each));
    }
    //fetch Education
    educationData = await Education.find({
      email: session?.user?.email,
    });
    if (educationData) {
      educationData = educationData.map((each) => db.convertDocToObj(each));
    }
    //fetch Award
    awardData = await Award.find({
      email: session?.user?.email,
    });
    if (awardData) {
      awardData = awardData.map((each) => db.convertDocToObj(each));
    }
    //fetch Objective
    objectiveData = await Objective.find({
      email: session?.user?.email,
    });
    if (objectiveData) {
      objectiveData = objectiveData.map((each) => db.convertDocToObj(each));
    }
    //fetch Skill
    skillData = await Skill.find({
      email: session?.user?.email,
    });
    if (skillData) {
      skillData = skillData.map((each) => db.convertDocToObj(each));
    }
    //fetch Project
    projectData = await Project.find({
      email: session?.user?.email,
    });
    if (projectData) {
      projectData = projectData.map((each) => db.convertDocToObj(each));
    }

    clientData = {
      contact: contactData,
      work: workData,
      education: educationData,
      award: awardData,
      skill: skillData,
      objective: objectiveData,
      project: projectData,
      resumeData: resumeData,
    };
  }

  return (
    <div className=" w-full items-center justify-between font-mono text-sm lg:flex border-4">
      {/* h-screen */}
      <div className="w-full flex flex-row border-2">
        <UserClient data={JSON.parse(JSON.stringify(clientData))} />
      </div>
    </div>
  );
}
