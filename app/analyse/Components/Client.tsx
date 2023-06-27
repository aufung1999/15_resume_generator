"use client";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Switch,
  TextArea,
} from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RootState } from "@/store/store";

import {
  editAnalyse_stage_1,
  editAnalyse_stage_2,
  removeAnalyse_stage_1,
} from "@/slices/analyseSlice";
import {
  cleanUp_Contact_redux,
  initialize_ClientData,
} from "@/slices/contactSlice";
import { WorkExpState, cleanUp_Work_redux, initialize_WorkData } from "@/slices/workSlice";
import {
  EducationState,
  cleanUp_Education_redux,
  initialize_EducationData,
} from "@/slices/educationSlice";
import { cleanUp_Award_redux, initialize_AwardData } from "@/slices/awardSlice";
import {
  cleanUp_Skill_redux,
  initialize_SkillData,
} from "@/slices/skillsSlice";
import {
  cleanUp_Objective_redux,
  initialize_ObjectiveData,
} from "@/slices/objectiveSlice";
import {
  cleanUp_Project_redux,
  initialize_ProjectData,
} from "@/slices/projectsSlice";
import Stage_2 from "./Stage_2";
import Compare from "./Compare";

export default function AnalyseClient({ data }: any) {
  const dispatch = useDispatch();
  const stage_1 = useSelector((state: RootState) => state.analyse.stage_1);
  const stage_2 = useSelector((state: RootState) => state.analyse.stage_2);

  useEffect(() => {
    if (data) {
      dispatch(cleanUp_Award_redux());
      dispatch(cleanUp_Contact_redux());
      dispatch(cleanUp_Education_redux());
      dispatch(cleanUp_Objective_redux());
      dispatch(cleanUp_Project_redux());
      dispatch(cleanUp_Skill_redux());
      dispatch(cleanUp_Work_redux());
      //initialize all the data to Redux Store
      dispatch(initialize_ClientData(data.contact));
      data.work.map((each: any) => {
        dispatch(initialize_WorkData(each));
      });
      data.education.map((each: any) =>
        dispatch(initialize_EducationData(each))
      );
      data.award.map((each: any) => dispatch(initialize_AwardData(each)));
      data.skill.map((each: any) => dispatch(initialize_SkillData(each)));
      data.objective.map((each: any) =>
        dispatch(initialize_ObjectiveData(each))
      );
      data.project.map((each: any) => dispatch(initialize_ProjectData(each)));
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const pre_stage_2 = stage_1.split("\n");
    console.log(stage_2);
    if (pre_stage_2) {
      //send to "redux store"
      dispatch(editAnalyse_stage_2(pre_stage_2));
      //remove the stage_1 after split func.
      dispatch(removeAnalyse_stage_1());
    }

    fetch("/api/chatgpt", {
      method: "POST",
      body: JSON.stringify(pre_stage_2),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div className=" flex">
      <Card
        className="border border-blue-600 w-6/12 h-full"
        interactive={false}
        elevation={Elevation.TWO}
      >
        {/* <Toaster /> */}
        <h1>Description</h1>

        <div className="w-full h-full border-4 flex flex-col items-center justify-center">
          {/* Control the form size */}
          <TextArea
            className="w-full h-72"
            onChange={(e) => dispatch(editAnalyse_stage_1(e.target.value))}
          />
        </div>
        <Button className="bp3-intent-primary" onClick={handleSubmit}>
          Submit
        </Button>

        <div className="w-full">
          {Array.isArray(stage_2) && <Stage_2 stage_2={stage_2} />}
        </div>
      </Card>
      <Card className="border border-red-600 w-6/12 h-full">
        {Array.isArray(stage_2) && <Compare />}
      </Card>
    </div>
  );
}
