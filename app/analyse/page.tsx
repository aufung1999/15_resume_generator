// import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import AnalyseClient from "./Components/Client";
import db from "@/utils/db";
import Contact from "@/models/Contact";
import Work from "@/models/Work";
import Education from "@/models/Education";
import Award from "@/models/Award";
import Objective from "@/models/Objective";
import Skill from "@/models/Skill";

export default async function Page() {
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
      // awardData = awardData.map((each) => db.convertDocToObj(each));
      awardData = JSON.parse(JSON.stringify(awardData));
    }
    //fetch Objective
    objectiveData = await Objective.find({
      email: session?.user?.email,
    });
    if (objectiveData) {
      // objectiveData = objectiveData.map((each) => db.convertDocToObj(each));
      objectiveData = JSON.parse(JSON.stringify(objectiveData));
    }
    //fetch Skill
    skillData = await Skill.find({
      email: session?.user?.email,
    });
    if (skillData) {
      // skillData = skillData.map((each) => db.convertDocToObj(each));
      skillData = JSON.parse(JSON.stringify(skillData));
    }

    clientData = {
      contact: contactData,
      work: workData,
      education: educationData,
      award: awardData,
      skill: skillData,
      objective: objectiveData,
    };

    // console.log("clientData: " + JSON.stringify(clientData, null, 1));
  }
  return (
    <div className="border-4 border-blue-300 w-full h-full">
      <AnalyseClient data={clientData} />
    </div>
  );
}
