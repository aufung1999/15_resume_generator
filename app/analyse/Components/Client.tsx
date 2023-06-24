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

export default function AnalyseClient() {
  const dispatch = useDispatch();
  const stage_1 = useSelector((state: RootState) => state.analyse.stage_1);

  const handleSubmit = () => {
    const stage_2 = stage_1.split("\n");
    console.log(stage_2);
    if (stage_2) {
      //send to "redux store"
      dispatch(editAnalyse_stage_2(stage_2));
      //remove the stage_1 after split func.
      dispatch(removeAnalyse_stage_1());
    }
  };

  return (
    <Card
      className="border border-blue-600 w-full h-full"
      interactive={false}
      elevation={Elevation.TWO}
    >
      {/* <Toaster /> */}
      <h1>Description</h1>

       <div className="w-fullh-full border-4 flex flex-col items-center justify-center">
        {/* Control the form size */}
        <TextArea
          className="w-full h-72"
          onChange={(e) => dispatch(editAnalyse_stage_1(e.target.value))}
        />
      </div>
      <Button className="bp3-intent-primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Card>
  );
}
