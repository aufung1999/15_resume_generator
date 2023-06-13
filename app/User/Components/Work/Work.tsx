"use client";
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import InsertWorkExp from "./Components/InsertWorkExp";

export default function Work() {
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={true}
      elevation={Elevation.TWO}
    >
      <h1>Work</h1>
      <div className=" border-4 flex flex-col items-center justify-center">
        <div className=" w-8/12">
          <InsertWorkExp />
        </div>
      </div>
      <Button className="bp3-intent-primary">Submit</Button>
    </Card>
  );
}
