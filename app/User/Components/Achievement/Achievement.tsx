"use client";
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import InsertAchievement from "./Components/InsertAchievement";

export default function Achievement() {
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={false}
      elevation={Elevation.TWO}
    >
      <h1>Achievement</h1>
      <div className=" border-4 flex flex-col items-center justify-center">
        <div className=" w-9/12">
          <InsertAchievement />
        </div>
      </div>
      <Button className="bp3-intent-primary">Submit</Button>
    </Card>
  );
}
