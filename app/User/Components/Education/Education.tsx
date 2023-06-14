"use client";
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import InsertEducation from "./Components/InsertEducation";

export default function Education() {
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={false}
      elevation={Elevation.TWO}
    >
      <h1>Education</h1>
      <div className=" border-4 flex flex-col items-center justify-center">
        <div className=" w-8/12">
         <InsertEducation />
        </div>
      </div>
      <Button className="bp3-intent-primary">Submit</Button>
    </Card>
  );
}
