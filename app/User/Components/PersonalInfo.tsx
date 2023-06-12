"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import Contact from "./Contact";
import Sidebar from "./Sidebar";

export default function PersonalInfo() {
  const [tab, setTab] = useState<string>("");

  return (
    <div className=" border-4 flex flex-col">
      <Sidebar setTab={setTab} />
      <div>{tab}</div>
      <Contact />
    </div>
  );
}
