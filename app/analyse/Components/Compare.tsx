import React from "react";
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

export default function Compare() {
  const stage_2 = useSelector((state: RootState) => state.analyse.stage_2);
  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);
  const award_redux = useSelector((state: RootState) => state.award);
  const skills_redux = useSelector((state: RootState) => state.skills);
  const objective_redux = useSelector((state: RootState) => state.objectives);
  const project_redux = useSelector((state: RootState) => state.projects);

  const CompareHandler = async () => {
    if (Array.isArray(stage_2)) {
      //=====Project=====
      let temp_project_arr1: any[] = [];
      let temp_project_arr2: any[] = [];
      project_redux.map((each) =>
        temp_project_arr1.push({
          index: each.index,
          array: extractTerms(each?.Techniques, "project_redux"),
        })
      );
      stage_2.map((each, index) =>
        temp_project_arr2.push({
          index: each,
          array: extractTerms(each, "input"),
        })
      );
      compare(temp_project_arr1, temp_project_arr2, "project");

      //=====Skill=====
      let temp_skill_arr1: any[] = [];
      let temp_skill_arr2: any[] = [];

      skills_redux.map((each) =>
        temp_skill_arr1.push({
          index: each.index,
          array: each.Skill_list,
        })
      );

      compare(temp_skill_arr1, temp_project_arr2, "skill");

      /**

const fetch_data = { user_data: temp_arr, input_data: stage_2 };

// ----result from the chatgpt API
const res = await fetch("/api/chatgpt", {
  method: "POST",
  body: JSON.stringify(fetch_data),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});
const data = await res.json();

console.log("data: " + JSON.stringify(data, null, 1));
//
*
 */
    }
  };
  return (
    <div>
      <Button onClick={CompareHandler}>Compare</Button>
    </div>
  );
}
