"use client";
import React, { useState } from "react";

import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import Sidebar from "./Sidebar";

import Contact from "./Contact/Contact";
import WorkComp from "./Work/WorkComp";
import Education from "./Education/Education";
import Achievement from "./Achievement/Achievement";
import Skills from "./Skills/Skills";
import Objective from "./Objective/Objective";
import Others from "./Others/Others";
import { AnimatePresence } from "framer-motion";

export default function PersonalInfo() {
  const [tab, setTab] = useState<string>("Contact");

  return (
    <div className=" border-4 flex flex-col">
      <Sidebar setTab={setTab} />
      <AnimatePresence>
        {tab === "Contact" && <Contact />}
        {tab === "Work" && <WorkComp />}
        {tab === "Education" && <Education />}
        {tab === "Achievement" && <Achievement />}
        {tab === "Skills" && <Skills />}
        {tab === "Objective" && <Objective />}
        {tab === "Others" && <Others />}
      </AnimatePresence>
    </div>
  );
}
