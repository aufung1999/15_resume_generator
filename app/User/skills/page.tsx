"use client";
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import InsertSkills from "./Components/InsertSkills";

import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

export default function Page() {
  const skills = useSelector((state: RootState) => state.skills);

  // Save to server
  const SubmitHandler = () => {
    fetch("/api/user/skill", {
      method: "POST",
      body: JSON.stringify(skills),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Skill Info Updated!"))
      .catch(() => toast.error("Cannot Update!"));
  };
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={false}
      elevation={Elevation.TWO}
    >
      <h1>Skills</h1>
      <div className=" border-4 flex flex-col items-center justify-center">
        <div className=" w-9/12">
          {" "}
          {/* Control the form size */}
          <InsertSkills />
        </div>
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </Card>
  );
}
