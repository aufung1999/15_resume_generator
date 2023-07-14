"use client";

import React, { useEffect } from "react";

import ContactClient from "@/app/user/contact/Components/Client";
import EducationClient from "@/app/user/education/Components/Client";
import ObjectiveClient from "@/app/user/objective/Components/Client";
import ProjectClient from "@/app/user/projects/Components/Client";
import SkillClient from "@/app/user/skills/Components/Client";
import WorkClient from "@/app/user/work/Components/Client";

import { switch_resumeComponents } from "@/slices/resumeSlice";

import { RootState } from "@/store/store";
import { Button } from "@blueprintjs/core";

import { useSelector, useDispatch } from "react-redux";

export default function EditResume({ data }: any) {
  const dispatch = useDispatch();

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
