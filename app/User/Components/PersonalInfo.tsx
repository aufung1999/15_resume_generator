"use client";
import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import Sidebar from "./Sidebar";

import Contact from "../contact/page";
import WorkComp from "../work/page";
import Education from "../education/page";
// import Achievement from "./Achievement/Achievement";
import Skills from "../skills/page";
import Objective from "../objective/page";
import Others from "../others/page";

export default function PersonalInfo() {
  const [tab, setTab] = useState<string>("Contact");

  return (
    <div className=" border-4 flex flex-col">
      {/* <Sidebar setTab={setTab} />

      {tab === "Contact" && <Contact />}
      {tab === "Work" && <WorkComp />}
      {tab === "Education" && <Education />}
      {tab === "Achievement" && <Achievement />}
      {tab === "Skills" && <Skills />}
      {tab === "Objective" && <Objective />}
      {tab === "Others" && <Others />} */}
    </div>
  );
}
