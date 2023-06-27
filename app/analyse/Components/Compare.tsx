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
    const res = stringSimilarity.compareTwoStrings("healed", "sealed");
    console.log("res: " + res);

    if (Array.isArray(stage_2)) {
      // stage_2?.map((each_input) => {
      //   console.log("each_input: " + each_input);
      //   project_redux.map((each) => {
      //     each.ProjectDescription.map((row) => {
      //       console.log("row.Row: " + row.Row),
      //         console.log(
      //           "res: " +
      //             stringSimilarity.compareTwoStrings(each_input, row.Row)
      //         );
      //     });
      //   });
      // });
      const res = project_redux.map((each) => extractTerms(each?.Techniques));
      console.log("res: " + JSON.stringify(res, null, 1));
    }
  };
  return (
    <div>
      <Button onClick={CompareHandler}>Compare</Button>
    </div>
  );
}
