"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import Sidebar from "./Sidebar";

import Contact from "./Contact/Contact";
import Work from "./Work";
import Education from "./Education";
import Achievement from "./Achievement";
import Skills from "./Skills";
import Objective from "./Objective";
import Others from "./Others";

export default function PersonalInfo() {
  const [tab, setTab] = useState<string>("Contact");

  return (
    <div className=" border-4 flex flex-col">
      <Sidebar setTab={setTab} />
      {tab === "Contact" && <Contact />}
      {tab === "Work" && <Work />}
      {tab === "Education" && <Education />}
      {tab === "Achievement" && <Achievement />}
      {tab === "Skills" && <Skills />}
      {tab === "Objective" && <Objective />}
      {tab === "Others" && <Others />}
    </div>
  );
}
