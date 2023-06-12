"use client";
import React from "react";
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
  return (
    <div className=" border-4 flex flex-col">
      <Sidebar />
      <Contact />
    </div>
  );
}
