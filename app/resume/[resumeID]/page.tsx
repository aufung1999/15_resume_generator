import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import db from "@/utils/db";
import Contact from "@/models/Contact";
import Work from "@/models/Work";
import Education from "@/models/Education";
import Award from "@/models/Award";
import Objective from "@/models/Objective";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Resume from "@/models/Resume";
import EditResume from "@/components/resume/Componenets/EditResume";
import ResumeClient from "@/components/resume/Componenets/Client";
import APIKey from "@/models/APIKey";

export default async function Page({
  params,
}: {
  params: { resumeID: string };
}) {
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
    resumeData,
    API_Key;

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
      workData = workData.map((each: any) => db.convertDocToObj(each));
      //Sort By Start Date, but need convert from string -> Date
      // workData.map((each: any) => new Date(each.StartDate));
      // workData.sort((a, b) => (a.StartDate > b.StartDate ? 1 : -1));
      // workData.map((each: any) => JSON.stringify(each.StartDate));
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
      awardData = awardData.map((each: any) => db.convertDocToObj(each));
    }
    //fetch Objective
    objectiveData = await Objective.find({
      email: session?.user?.email,
    });
    if (objectiveData) {
      objectiveData = objectiveData.map((each: any) =>
        db.convertDocToObj(each)
      );
    }
    //fetch Skill
    skillData = await Skill.find({
      email: session?.user?.email,
    });
    if (skillData) {
      skillData = skillData.map((each: any) => db.convertDocToObj(each));
    }
    //fetch Project
    projectData = await Project.find({
      email: session?.user?.email,
    });
    if (projectData) {
      projectData = projectData.map((each: any) => db.convertDocToObj(each));
    }
    //fetch Resume
    resumeData = await Resume.findOne({
      email: session?.user?.email,
      _id: params.resumeID,
    });
    if (resumeData) {
      resumeData = db.convertDocToObj(resumeData);
      //resume.Work
      if (resumeData?.Work) {
        //Sort By Start Date, but need convert from string -> Date
        // resumeData?.Work?.map((each: any) => new Date(each.StartDate));
        // resumeData?.Work?.sort((a: any, b: any) =>
        //   a.StartDate > b.StartDate ? 1 : -1
        // );
        // resumeData?.Work?.map((each: any) => JSON.stringify(each.StartDate));
      }
    }
    //fetch APIKey
    API_Key = await APIKey.findOne({
      email: session?.user?.email,
    });

    clientData = {
      contact: contactData,
      work:
        ((resumeData?.Work?.length !== 0 ||
          resumeData?.Work !== null ||
          resumeData?.Work !== undefined) &&
          resumeData?.Work) ||
        workData,
      education: educationData,
      award: awardData,
      skill:
        ((resumeData?.Skill?.length !== 0 ||
          resumeData?.Skill !== null ||
          resumeData?.Skill !== undefined) &&
          resumeData?.Skill) ||
        skillData,
      objective: objectiveData,
      project:
        ((resumeData?.Project?.length !== 0 ||
          resumeData?.Project !== null ||
          resumeData?.Project !== undefined) &&
          resumeData?.Project) ||
        projectData,
      api_key: API_Key,
    };
    return (
      <div className="flex w-full max-h-screen">
        <div className=" w-3/12 overflow-auto no-scrollbar">
          <EditResume data={JSON.parse(JSON.stringify(clientData))} />
        </div>
        <div className=" w-9/12 overflow-auto relative no-scrollbar z-10">
          <ResumeClient
            resumeID={params.resumeID}
            data={JSON.parse(JSON.stringify(clientData))}
          />
        </div>
      </div>
    );
  }
  return <div>go Login</div>;
}
