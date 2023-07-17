"use client";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Switch,
  TextArea,
  Icon,
} from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RootState } from "@/store/store";

import {
  editAnalyse_company_name,
  editAnalyse_job_position,
  editAnalyse_stage_1,
  editAnalyse_stage_2,
  editAnalyse_website,
  removeAnalyse_stage_1,
} from "@/slices/analyseSlice";
import {
  cleanUp_Contact_redux,
  initialize_ClientData,
} from "@/slices/contactSlice";
import {
  WorkExpState,
  cleanUp_Work_redux,
  initialize_WorkData,
} from "@/slices/workSlice";
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
import { editAPI_KEY } from "@/slices/controlSlice";

export default function AnalyseClient({ data }: any) {
  const dispatch = useDispatch();
  const stage_1 = useSelector((state: RootState) => state.analyse.stage_1);
  const stage_2 = useSelector((state: RootState) => state.analyse.stage_2);

  const job_position = useSelector(
    (state: RootState) => state.analyse.job_position
  );
  const company_name = useSelector(
    (state: RootState) => state.analyse.company_name
  );
  const website = useSelector((state: RootState) => state.analyse.website);

  const API_KEY = useSelector((state: RootState) => state.control.API_KEY);

  useEffect(() => {
    if (data) {
      //clean up Redux data
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

      if (data.api_key) {
        dispatch(editAPI_KEY(data.api_key.api_key));
      }
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
  };

  const APIKeyHandler = (e: any) => {
    if (API_KEY === "") {
      return toast.error("nothing typed");
    }
    fetch("/api/user/apikey", {
      method: "POST",
      body: JSON.stringify({ API_Key: API_KEY }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => toast.success(data?.message))
      .catch(() => toast.error("Cannot Update!"));
  };

  return (
    <div className=" flex">
      <Toaster />
      <Card
        className="border border-blue-600 w-6/12 h-full px-5 py-3"
        interactive={false}
        elevation={Elevation.TWO}
      >
        {/* <Toaster /> */}
        <div className="grid grid-cols-2">
          <div className="">
            <div className="flex">
              <h1 className=" font-semibold italic underline ">
                Job Position{" "}
              </h1>
              <span className="ms-1 text-xs">(Required)</span>
            </div>
            <div>
              <InputGroup
                onChange={(e) =>
                  dispatch(editAnalyse_job_position(e.target.value))
                }
                maxLength={50}
                value={job_position}
                placeholder="copy from the Job description"
                className="w-full flex flex-col "
                fill={true}
              />
            </div>
          </div>
          <div className="w-full flex flex-col ">
            <div className="flex">
              <h1 className=" font-semibold italic underline ">Compnay Name</h1>
              <span className="ms-1 text-xs">(Required)</span>
            </div>
            <InputGroup
              onChange={(e) =>
                dispatch(editAnalyse_company_name(e.target.value))
              }
              maxLength={30}
              value={company_name}
              placeholder="copy from the Job description"
              className="w-full flex flex-col "
              fill={true}
            />
          </div>
          <div>
            <div className="flex">
              <h1 className=" font-semibold italic underline ">Website</h1>
              <span className="ms-1 text-xs">(Required)</span>
            </div>
            <div>
              <InputGroup
                onChange={(e) => dispatch(editAnalyse_website(e.target.value))}
                value={website}
                maxLength={30}
                placeholder="e.g. indeed"
                className="w-full flex flex-col "
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <h1>Description</h1>
          <div className="flex border">
            <div>API Key:</div>
            <InputGroup
              onChange={(e) => dispatch(editAPI_KEY(e.target.value))}
              value={API_KEY}
              // maxLength={30}
              placeholder="e.g. indeed"
              // className="w-full flex flex-col "
            />
            <Button onClick={APIKeyHandler} icon="insert" />
          </div>
        </div>

        <div className="w-full h-full border-4 flex flex-col items-center justify-center relative">
          {/* if the chatGPT API key is not present */}
          {/* Control the form size */}
          <TextArea
            className="w-full h-72 p-3"
            onChange={(e) => dispatch(editAnalyse_stage_1(e.target.value))}
            growVertically={true}
            value={stage_1}
            placeholder={
              API_KEY
                ? "Paste the Job Description here"
                : "Paste your API Key from ChatGPT first"
            }
            disabled={API_KEY ? false : true}
          />
        </div>
        <div className="w-full flex justify-end pe-10">
          <Button
            className={`flex ${
              JSON.stringify(stage_1.length) === "0"
                ? " text-gray-200 rounded"
                : " text-black rounded"
            }`}
            disabled={
              JSON.stringify(stage_1.length) === "0" ||
              stage_1 === null ||
              API_KEY === null ||
              job_position === null ||
              company_name === null ||
              website === null
                ? true
                : false
            }
            onClick={handleSubmit}
          >
            <div className="flex">
              <div className="flex items-center me-2">
                {JSON.stringify(stage_1.length) === "0" ||
                stage_1 === null ||
                API_KEY === null ||
                job_position === null ||
                company_name === null ||
                website === null ? (
                  <Icon icon="lock" color="red" iconSize={10} />
                ) : (
                  <Icon icon="unlock" color="green" iconSize={10} />
                )}
              </div>
              <div>Submit</div>
            </div>
          </Button>
        </div>

        <div className="w-full">
          {Array.isArray(stage_2) && <Stage_2 stage_2={stage_2} />}
        </div>
      </Card>
      <Card className="border border-red-600 w-6/12 h-full relative">
        {Array.isArray(stage_2) && <Compare />}
      </Card>
    </div>
  );
}
