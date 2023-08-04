"use client";

import React, { useEffect } from "react";

import ContactClient from "../contact/ContactClient";
import EducationClient from "../education/Client";
import ObjectiveClient from "../objective/Components/Client";
import ProjectClient from "../projects/Components/Client";
import SkillClient from "../skills/Components/Client";
import WorkClient from "../work/Components/Client";

import { RootState } from "@/store/store";
import { Button } from "@blueprintjs/core";

import { useSelector, useDispatch } from "react-redux";
import { editAPI_KEY, switch_Components } from "@/slices/controlSlice";

import { useSearchParams } from "next/navigation";
import Resumes from "./Resumes";

export default function UserClient({ data }: any) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const dispatch = useDispatch();

  const switch_tab = useSelector((state: RootState) => state.control.switch);

  // if (data.api_key) {
  //   dispatch(editAPI_KEY(data.api_key.api_key));
  // }

  return (
    <div className=" w-full relative " key={search}>
      <div className="flex">
        <Button
          className=" "
          onClick={() => dispatch(switch_Components({ select: "Resumes" }))}
        >
          Resumes
        </Button>
        <div className="grid grid-cols-3">
          <Button
            onClick={() => dispatch(switch_Components({ select: "Contact" }))}
          >
            Contact
          </Button>
          <Button
            onClick={() => dispatch(switch_Components({ select: "Objective" }))}
          >
            Objective
          </Button>
          <Button
            onClick={() => dispatch(switch_Components({ select: "Skill" }))}
          >
            Skill
          </Button>
          <Button
            onClick={() => dispatch(switch_Components({ select: "Education" }))}
          >
            Education
          </Button>
          <Button
            onClick={() => dispatch(switch_Components({ select: "Work" }))}
          >
            Work
          </Button>
          <Button
            onClick={() => dispatch(switch_Components({ select: "Project" }))}
          >
            Project
          </Button>
        </div>
      </div>
      <div className="w-full relative border-4">
        <div className={switch_tab === "Resumes" ? " w-full" : "hidden"}>
          <Resumes resumeData={data.resumeData} />
        </div>
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
