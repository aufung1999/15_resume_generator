"use client";
import React, { useState } from "react";
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
import { RootState } from "@/store/store";
import extractTerms from "../Functions/extractTerms";
import compare from "../Functions/compare";
import Statistic from "./Statistic";
import Loading from "../../../app/analyse/loading";

export default function Compare() {
  const stage_2 = useSelector((state: RootState) => state.analyse.stage_2);
  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);
  const award_redux = useSelector((state: RootState) => state.award);
  const skills_redux = useSelector((state: RootState) => state.skills);
  const objective_redux = useSelector((state: RootState) => state.objectives);
  const project_redux = useSelector((state: RootState) => state.projects);

  //Get the Client API Key from ChatGPT, but stored inDatabase
  const API_KEY = useSelector((state: RootState) => state.control.API_KEY);

  const [result, setRes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  //===total results from the function
  let temp_arr: any[] = [];

  const CompareHandler = async () => {
    setRes([]);
    setLoading(true);
    if (Array.isArray(stage_2)) {
      let fetch_stage_2: any[] = [];
      stage_2.map((each, index) =>
        fetch_stage_2.push({
          index: each,
          array: extractTerms(each, "input"),
        })
      );

      //=====Skill=====
      let temp_skill: any[] = [];

      skills_redux.map((each: any) =>
        temp_skill.push({
          index: each.index,
          array: each.Skill_list,
        })
      );
      let compare_res_skill: any = compare(temp_skill, fetch_stage_2, "skill");

      if (compare_res_skill) {
        temp_arr.push(...compare_res_skill);
      }

      //=====Project===== --------------------- 1
      let temp_project: any[] = [];
      project_redux.map((each: any) =>
        temp_project.push({
          index: each.index,
          array: extractTerms(each?.Techniques, "project_redux"),
        })
      );

      let compare_res_project: any = compare(
        temp_project,
        fetch_stage_2,
        "project"
      );

      if (compare_res_project) {
        temp_arr.push(...compare_res_project);
      }

      console.log(compare_res_project);

      //=====Project===== --------------------- 2
      let temp_project_2: any[] = [];
      project_redux.map((each: any) =>
        each.ProjectDescription.map((element: any) =>
          temp_project_2.push({
            index_1st: each.index,
            index_2nd: element.rowIndex,
            ProjectDescription: element.Row,
          })
        )
      );
      const fetch_data_project = {
        user_data: temp_project_2,
        input_data: stage_2,
        API_KEY: API_KEY,
      };
      // ----result from the chatgpt API
      const res_project = await fetch("/api/chatgpt/project", {
        method: "POST",
        body: JSON.stringify(fetch_data_project),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const { data_project, total_usage_project } = await res_project.json();

      // const data_project: any = [];
      // const total_usage_project = 0;

      //=====Work=====
      let temp_work: any[] = [];

      work_redux.map((each: any) =>
        each.JobDescription.map((element: any) =>
          temp_work.push({
            index_1st: each.index,
            index_2nd: element.rowIndex,
            JobDescription: element.Row,
          })
        )
      );
      const fetch_data = {
        user_data: temp_work,
        input_data: stage_2,
        API_KEY: API_KEY,
      };

      // ----result from the chatgpt API
      const res = await fetch("/api/chatgpt/work", {
        method: "POST",
        body: JSON.stringify(fetch_data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const { data, total_usage } = await res.json();
      //=====Get the result and display=====
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "total_usage",
          JSON.stringify(Number(total_usage) + Number(total_usage_project))
        );
      }
      setRes([...temp_arr, ...data, ...data_project]);
      setLoading(false);
      // setRes(data);
    }
  };

  return (
    <div>
      <Button
        large
        onClick={CompareHandler}
        className={`flex w-full justify-center m-3 ${
          JSON.stringify(stage_2?.length) === "0"
            ? " text-gray-200 rounded"
            : " text-black rounded"
        }`}
        disabled={
          JSON.stringify(stage_2?.length) === "0" || stage_2 === null
            ? true
            : false
        }
      >
        <div className="flex">
          <div className="flex items-center me-2">
            {JSON.stringify(stage_2?.length) === "0" || stage_2 === null ? (
              <Icon icon="lock" color="red" iconSize={10} />
            ) : (
              <Icon icon="unlock" color="green" iconSize={10} />
            )}
          </div>
          <div>Compare</div>
        </div>
      </Button>

      {loading === false && (
        <div className=" border-2 border-red-300">
          {result.length !== 0 && <Statistic res={result} />}
        </div>
      )}
      {loading === true && <Loading />}
    </div>
  );
}
