"use client";

import React, { useEffect } from "react";

import ContactClient from "../contact/ContactClient";
import EducationClient from "../education/Client";
import ObjectiveClient from "../objective/Client";
import ProjectClient from "../projects/Client";
import SkillClient from "../skills/Client";
import WorkClient from "../work/Client";

import { RootState } from "@/store/store";
import { Button } from "@blueprintjs/core";

import { useSelector, useDispatch } from "react-redux";

import { useSearchParams } from "next/navigation";
import Resumes from "./Resumes";
import { switch_Components } from "@/slices/controlSlice";

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
      <div className="flex gap-3 justify-center py-3">
        <Button
          className=" "
          onClick={() => dispatch(switch_Components({ select: "Resumes" }))}
        >
          Resumes
        </Button>

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
        <Button onClick={() => dispatch(switch_Components({ select: "Work" }))}>
          Work
        </Button>
        <Button
          onClick={() => dispatch(switch_Components({ select: "Project" }))}
        >
          Project
        </Button>
      </div>
      <div className="w-full relative border-4">
        <div className={switch_tab === "Resumes" ? " w-full" : "  hidden "}>
          <Resumes resumeData={data.resumeData} />
        </div>
        <div className={switch_tab === "Contact" ? " w-full" : "   "}>
          <div>Contact</div>
          <ContactClient data={data.contact} />
        </div>
        <div className={switch_tab === "Objective" ? " w-full" : "   "}>
          <ObjectiveClient data={data.objective} />
        </div>
        <div className={switch_tab === "Skill" ? " w-full" : "   "}>
          <SkillClient data={data.skill} />
        </div>
        <div className={switch_tab === "Education" ? "w-full" : "   "}>
          <EducationClient data={data.education} />
        </div>
        <div className={switch_tab === "Work" ? "w-full" : "   "}>
          <WorkClient data={data.work} />
        </div>
        <div className={switch_tab === "Project" ? "w-full" : "   "}>
          <ProjectClient data={data.project} />
        </div>
      </div>
    </div>
  );
}
