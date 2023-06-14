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
import Work from "./Work/Work";
import Education from "./Education/Education";
import Achievement from "./Achievement/Achievement";
import Skills from "./Skills/Skills";
import Objective from "./Objective/Objective";
import Others from "./Others/Others";

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
