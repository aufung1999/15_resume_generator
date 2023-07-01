"use client";
import { RootState } from "@/store/store";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BasicIntro from "./BasicIntro";
import { WorkSection } from "./Work";
import EducationSection from "./Education";
import SkillSection from "./Skill";
import ProjectSection from "./Project";
import { forwardRef } from "react";

import ReactToPrint from "react-to-print";
import { Button } from "@blueprintjs/core";
import Resume from "./Resume";

const pageStyle = "@page {size: A4 landscape;}";

const ResumeClient = () => {
  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);
  const skill_redux = useSelector((state: RootState) => state.skills);
  const project_redux = useSelector((state: RootState) => state.projects);

  const componentRef = useRef<any>();

  return (
    <div className=" bg-gray-300">
      <ReactToPrint
        removeAfterPrint={true}
        trigger={() => <Button>Print this out!</Button>}
        content={() => componentRef.current}
      />
      <div className="border-2 flex justify-center border-red-300">
        <Resume ref={componentRef} />
      </div>
    </div>
  );
};

export default ResumeClient;
