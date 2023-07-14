import React, { useState } from "react";
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
import { RootState } from "@/store/store";
import extractTerms from "../Functions/extractTerms";
import compare from "../Functions/compare";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import Statistic from "./Statistic";

export default function Compare() {
  const stage_2 = useSelector((state: RootState) => state.analyse.stage_2);
  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);
  const award_redux = useSelector((state: RootState) => state.award);
  const skills_redux = useSelector((state: RootState) => state.skills);
  const objective_redux = useSelector((state: RootState) => state.objectives);
  const project_redux = useSelector((state: RootState) => state.projects);

  const [result, setRes] = useState<any>([]);

  //===total results from the function
  let temp_arr: any[] = [];

  const CompareHandler = async () => {
    setRes([]);
    if (Array.isArray(stage_2)) {
      let fetch_stage_2: any[] = [];
      stage_2.map((each, index) =>
        fetch_stage_2.push({
          index: each,
          array: extractTerms(each, "input"),
        })
      );
      //=====Project=====
      let temp_project: any[] = [];
      project_redux.map((each) =>
        temp_project.push({
          index: each.index,
          array: extractTerms(each?.Techniques, "project_redux"),
        })
      );

      temp_arr.push(...compare(temp_project, fetch_stage_2, "project"));

      //=====Skill=====
      let temp_skill: any[] = [];

      skills_redux.map((each) =>
        temp_skill.push({
          index: each.index,
          array: each.Skill_list,
        })
      );
      temp_arr.push(...compare(temp_skill, fetch_stage_2, "skill"));

      //=====Pre-process Work=====
      const filtered_stage_2 = stage_2.filter(
        (each) =>
          temp_arr.find((each_each) => each_each.match_sentence === each)
            ?.match_sentence !== each
      );

      console.log(
        "filtered_stage_2: " + JSON.stringify(filtered_stage_2, null, 1)
      );

      //=====Work=====
      let temp_work: any[] = [];

      work_redux.map((each) =>
        each.JobDescription.map((element) =>
          temp_work.push({
            index_1st: each.index,
            index_2nd: element.rowIndex,
            JobDescription: element.Row,
          })
        )
      );
      const fetch_data = { user_data: temp_work, input_data: filtered_stage_2 };

      // ----result from the chatgpt API
      const res = await fetch("/api/chatgpt/work", {
        method: "POST",
        body: JSON.stringify(fetch_data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const { data, total_usage } = await res.json();
      localStorage.setItem("total_usage", total_usage);
      //=====Get the result and display=====
      setRes([...temp_arr, ...data]);
      // setRes(data);
    }
  };

  return (
    <div>
      <Button
        onClick={CompareHandler}
        className={stage_2 ? " rounded border text-lg" : "hidden"}
      >
        Compare
      </Button>
      {/* <div>
        {result?.map((each: any, i: number) => (
          <div key={i}>{JSON.stringify(each.match_sentence, null, 1)}</div>
        ))}
      </div> */}
      <div className=" border-2 border-red-300">
        {result.length !== 0 && <Statistic res={result} />}
      </div>
    </div>
  );
}
