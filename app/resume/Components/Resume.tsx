"use client";
import { RootState } from "@/store/store";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Contact from "./Contact";
import { WorkSection } from "./Work";
import EducationSection from "./Education";
import SkillSection from "./Skill";
import ProjectSection from "./Project";
import ObjectiveSection from "./Objective";
import { forwardRef } from "react";

const Resume = forwardRef((props, ref: any) => {
  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);
  const skill_redux = useSelector((state: RootState) => state.skills);
  const project_redux = useSelector((state: RootState) => state.projects);
  const objective_redux = useSelector((state: RootState) => state.objectives);

  return (
    <div
      className=" w-a4 h-a4 border-2  px-6 py-2 bg-white text-black"
      ref={ref}
    >
      <div className={"flex-col h-full "}>
        <div className="">
          <Contact
            FirstName={contact_redux.FirstName}
            LastName={contact_redux.LastName}
            PhoneNumber={contact_redux.PhoneNumber}
            Country={contact_redux.Country}
            City={contact_redux.City}
            State={contact_redux.State}
            ZipCode={contact_redux.ZipCode}
            Email={contact_redux.Email}
            Portfolio={contact_redux.Portfolio}
            LinkedIn={contact_redux.LinkedIn}
            GitHub={contact_redux.GitHub}
          />
        </div>
        <div>
          <ObjectiveSection objective={objective_redux} />
        </div>
        <div className="">
          <EducationSection education={education_redux} />
        </div>
        <div className="">
          <SkillSection skill={skill_redux} />
        </div>
        <div className="">
          <WorkSection experience={work_redux} />
        </div>
        <div className="">
          <ProjectSection project={project_redux} />
        </div>
      </div>
    </div>
  );
});

Resume.displayName = "Resume";
export default Resume;
