import React from "react";
import stringSimilarity from "string-similarity";
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
import extractTerms from "@/utils/extractTerms";

export default function Compare() {
  const stage_2 = useSelector((state: RootState) => state.analyse.stage_2);
  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);
  const award_redux = useSelector((state: RootState) => state.award);
  const skills_redux = useSelector((state: RootState) => state.skills);
  const objective_redux = useSelector((state: RootState) => state.objectives);
  const project_redux = useSelector((state: RootState) => state.projects);

  const CompareHandler = () => {
    if (Array.isArray(stage_2)) {
      let temp_arr = [];

      project_redux.map((each) =>
        temp_arr.push({ [each.index]: extractTerms(each?.Techniques) })
      );
      console.log("res: " + JSON.stringify(temp_arr, null, 1));
    }
  };
  return (
    <div>
      <Button onClick={CompareHandler}>Compare</Button>
    </div>
  );
}
