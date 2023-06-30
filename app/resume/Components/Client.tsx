"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BasicIntro from "./BasicIntro";
import { WorkSection } from "./Work";
import EducationSection from "./Education";

export default function ResumeClient() {
  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);

  return (
    <div className="p-2 border-8">
      <BasicIntro
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
      <div>
        <EducationSection education={education_redux} />
      </div>
      <div className="">
        <WorkSection experience={work_redux} />
      </div>
    </div>
  );
}
