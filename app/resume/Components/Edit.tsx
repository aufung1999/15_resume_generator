"use client";

import React, { useEffect } from "react";

import ContactClient from "@/app/user/contact/Components/Client";
import EducationClient from "@/app/user/education/Components/Client";
import ObjectiveClient from "@/app/user/objective/Components/Client";
import ProjectClient from "@/app/user/projects/Components/Client";
import SkillClient from "@/app/user/skills/Components/Client";
import WorkClient from "@/app/user/work/Components/Client";
import { cleanUp_Award_redux } from "@/slices/awardSlice";
import { cleanUp_Contact_redux } from "@/slices/contactSlice";
import { cleanUp_Education_redux } from "@/slices/educationSlice";
import { cleanUp_Objective_redux } from "@/slices/objectiveSlice";
import { cleanUp_Project_redux } from "@/slices/projectsSlice";
import { switch_resumeComponents } from "@/slices/resumeSlice";
import { cleanUp_Skill_redux } from "@/slices/skillsSlice";
import { cleanUp_Work_redux } from "@/slices/workSlice";
import { RootState } from "@/store/store";
import { Button } from "@blueprintjs/core";

import { useSelector, useDispatch } from "react-redux";

export default function EditResume({ data }: any) {
  const dispatch = useDispatch();
  //clean up Redux data

  useEffect(() => {
    dispatch(cleanUp_Award_redux());
    dispatch(cleanUp_Contact_redux());
    dispatch(cleanUp_Education_redux());
    dispatch(cleanUp_Objective_redux());
    dispatch(cleanUp_Project_redux());
    dispatch(cleanUp_Skill_redux());
    dispatch(cleanUp_Work_redux());
  }, []);

  // if (typeof window !== "undefined") {
  //   if (localStorage.getItem("stage_3")) {
  //     const newObject: any = window.localStorage.getItem("stage_3");
  //     console.log(JSON.parse(newObject));
  //   } else {
  //     return [];
  //   }
  // }

  const switch_tab = useSelector((state: RootState) => state.resume.switch);

  return (
    <div className=" w-full relative">
      <div className="grid grid-cols-3">
        <Button
          onClick={() =>
            dispatch(switch_resumeComponents({ select: "Contact" }))
          }
        >
          Contact
        </Button>
        <Button
          onClick={() =>
            dispatch(switch_resumeComponents({ select: "Objective" }))
          }
        >
          Objective
        </Button>
        <Button
          onClick={() => dispatch(switch_resumeComponents({ select: "Skill" }))}
        >
          Skill
        </Button>
        <Button
          onClick={() =>
            dispatch(switch_resumeComponents({ select: "Education" }))
          }
        >
          Education
        </Button>
        <Button
          onClick={() => dispatch(switch_resumeComponents({ select: "Work" }))}
        >
          Work
        </Button>
        <Button
          onClick={() =>
            dispatch(switch_resumeComponents({ select: "Project" }))
          }
        >
          Project
        </Button>
      </div>
      <div className="w-full h-full relative border-4">
        <div className={switch_tab === "Contact" ? " w-full" : "hidden"}>
          <ContactClient data={data.contact} />
        </div>
        <div className={switch_tab === "Objective" ? " w-full" : "hidden"}>
          <ObjectiveClient data={data.objective} />
        </div>
        <div className={switch_tab === "Skill" ? " w-full" : "hidden"}>
          <SkillClient data={data.skill} />
        </div>
        <div className={switch_tab === "Education" ? "w-full" : "hidden"}>
          <EducationClient data={data.education} />
        </div>
        <div className={switch_tab === "Work" ? "w-full" : "hidden"}>
          <WorkClient data={data.work} />
        </div>
        <div className={switch_tab === "Project" ? "w-full" : "hidden"}>
          <ProjectClient data={data.project} />
        </div>
      </div>
    </div>
  );
}
