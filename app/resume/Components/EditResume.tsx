"use client";

import React, { useEffect } from "react";

import ContactClient from "./User_Contact/Client";
import EducationClient from "./user_education/Client";
import ObjectiveClient from "./user_objective/Client";
import ProjectClient from "./user_projects/Client";
import SkillClient from "./user_skills/Client";
import WorkClient from "./user_works/Client";

import { Button } from "@blueprintjs/core";

import { useSelector, useDispatch } from "react-redux";

import { useSearchParams } from "next/navigation";
import { switch_resumeComponents } from "../../../slices/resumeSlice";
import { editAPI_KEY } from "../../../slices/controlSlice";
import { RootState } from "@/store/store";

export default function EditResume({ data }: any) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const dispatch = useDispatch();

  const switch_tab = useSelector((state: RootState) => state.resume.switch);

  if (data.api_key) {
    dispatch(editAPI_KEY(data.api_key.api_key));
  }

  return (
    <div className=" w-full relative" key={search}>
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
