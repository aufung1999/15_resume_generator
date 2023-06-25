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
import { initialize_ClientData } from "@/slices/contactSlice";

export default function AnalyseClient({ data }: any) {
  const dispatch = useDispatch();
  const stage_1 = useSelector((state: RootState) => state.analyse.stage_1);
  const stage_2 = useSelector((state: RootState) => state.analyse.stage_2);

  useEffect(() => {
    if (data) {
      console.log("data: " + JSON.stringify(data, null, 1));
      dispatch(initialize_ClientData(data.contact));
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

      let array;

      // stage_2.map((each) => {

      // console.log("res: " + JSON.stringify(res, null, 1));
      // });
      // .then(() => toast.success("User Contact Info Updated!"))
      // .catch(() => toast.error("Cannot Update!"))
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
