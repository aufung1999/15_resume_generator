"use client";
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import InsertSkills from "./InsertSkills";

export default function SkillClient({ data }: any) {
  const skills = useSelector((state: RootState) => state.skills);

  // Save to server
  const SubmitHandler = (e: any) => {
    e.preventDefault();
    fetch("/api/user/skill", {
      method: "POST",
      body: JSON.stringify(skills),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Skill Updated!"))
      .catch(() => toast.error("Cannot Update!"));
  };
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={false}
      elevation={Elevation.TWO}
    >
      <Toaster />
      <h1>Skills</h1>

      <div className=" border-4 flex flex-col items-center justify-center">
        {/* Control the form size */}
        <InsertSkills data={data} />
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </Card>
  );
}
