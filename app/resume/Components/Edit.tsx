"use client";

import ContactClient from "@/app/user/contact/Components/Client";
import EducationClient from "@/app/user/education/Components/Client";
import ObjectiveClient from "@/app/user/objective/Components/Client";
import ProjectClient from "@/app/user/projects/Components/Client";
import WorkClient from "@/app/user/work/Components/Client";
import { cleanUp_Award_redux } from "@/slices/awardSlice";
import { cleanUp_Contact_redux } from "@/slices/contactSlice";
import { cleanUp_Education_redux } from "@/slices/educationSlice";
import { cleanUp_Objective_redux } from "@/slices/objectiveSlice";
import { cleanUp_Project_redux } from "@/slices/projectsSlice";
import { cleanUp_Skill_redux } from "@/slices/skillsSlice";
import { cleanUp_Work_redux } from "@/slices/workSlice";

import { useSelector, useDispatch } from "react-redux";

export default function EditResume({ data }: any) {
  const dispatch = useDispatch();
  //clean up Redux data
  dispatch(cleanUp_Award_redux());
  dispatch(cleanUp_Contact_redux());
  dispatch(cleanUp_Education_redux());
  dispatch(cleanUp_Objective_redux());
  dispatch(cleanUp_Project_redux());
  dispatch(cleanUp_Skill_redux());
  dispatch(cleanUp_Work_redux());

  let newObject;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("stage_3")) {
      newObject = window.localStorage.getItem("stage_3");
      console.log(JSON.parse(newObject));
    } else {
      return [];
    }
  }

  return (
    <div className="w-full">
      <div>Edit</div>
      <div>
        <ContactClient data={data.contact} />
      </div>
      <div>
        <ObjectiveClient data={data.objective} />
      </div>
      <div>
        <EducationClient data={data.education} />
      </div>
      <div>
        <WorkClient data={data.work} />
      </div>
      <div>
        <ProjectClient data={data.project} />
      </div>
    </div>
  );
}
