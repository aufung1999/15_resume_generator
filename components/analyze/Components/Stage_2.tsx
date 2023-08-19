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

export default function Stage_2({ stage_2 }: any) {
  return (
    <>
      {stage_2?.map((each: any, i: number) => (
        <div className="flex w-full border" key={i}>
          <div className="border-2 w-11/12">{each}</div>
          <Button className="border-2 w-1/12">-</Button>
        </div>
      ))}
    </>
  );
}
