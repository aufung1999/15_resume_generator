// import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import AnalyseClient from "@/components/analyze/Components/Client";

import db from "@/utils/db";
import Contact from "@/models/Contact";
import Work from "@/models/Work";
import Education from "@/models/Education";
import Award from "@/models/Award";
import Objective from "@/models/Objective";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import APIKey from "@/models/APIKey";

export default async function Page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let clientData,
    contactData,
    workData,
    educationData,
    awardData,
    objectiveData,
    skillData,
    projectData,
    API_Key;
  //check if "Authenticated"
  if (session) {
    await db.connect();
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
      workData = workData.map((each:any) => db.convertDocToObj(each));
    }
    //fetch Education
    educationData = await Education.find({
      email: session?.user?.email,
    });
    if (educationData) {
      educationData = educationData.map((each:any) => db.convertDocToObj(each));
    }
    //fetch Award
    awardData = await Award.find({
      email: session?.user?.email,
    });
    if (awardData) {
      awardData = awardData.map((each:any) => db.convertDocToObj(each));
    }
    //fetch Objective
    objectiveData = await Objective.find({
      email: session?.user?.email,
    });
    if (objectiveData) {
      objectiveData = objectiveData.map((each:any) => db.convertDocToObj(each));
    }
    //fetch Skill
    skillData = await Skill.find({
      email: session?.user?.email,
    });
    if (skillData) {
      skillData = skillData.map((each:any) => db.convertDocToObj(each));
    }
    //fetch Project
    projectData = await Project.find({
      email: session?.user?.email,
    });
    if (projectData) {
      projectData = projectData.map((each:any) => db.convertDocToObj(each));
    }
    //fetch APIKey
    API_Key = await APIKey.findOne({
      email: session?.user?.email,
    });

    clientData = {
      contact: contactData,
      work: workData,
      education: educationData,
      award: awardData,
      skill: skillData,
      objective: objectiveData,
      project: projectData,
      api_key: API_Key,
    };

    // console.log("clientData: " + JSON.stringify(clientData, null, 1));
    return (
      <div className="border-4 border-blue-300 w-full h-full">
        <AnalyseClient data={JSON.parse(JSON.stringify(clientData))} />
      </div>
    );
  }
  return <div>go Login</div>;
}
