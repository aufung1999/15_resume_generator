"use client";
import React, { Dispatch, SetStateAction } from "react";

import "@blueprintjs/core/lib/css/blueprint.css";
import {
  Navbar,
  NavbarHeading,
  NavbarGroup,
  NavbarDivider,
  Button,
  Alignment,
  Popover,
  Tooltip,
  Position,
} from "@blueprintjs/core";

interface Props {setSomeState: Dispatch<string>}

export default function Sidebar({ setTab }) {
  return (
    <div className="border border-blue-600 ">
      <div className=" flex justify-between border w-full">
        <Button icon="id-number" onClick={() => setTab("Contact")}>
          <div className=" text-xs hover:text-sm">Contact</div>
        </Button>

        <Button icon="build"  onClick={() => setTab("Work")}>
          <div className=" text-xs hover:text-sm">Work</div>
        </Button>

        <Button icon="learning" onClick={() => setTab("Education")}>
          <div className=" text-xs hover:text-sm">Education</div>
        </Button>

        <Button icon="star" onClick={() => setTab("Achievement")}>
          <div className=" text-xs hover:text-sm">Achievement</div>
        </Button>

        <Button icon="property" onClick={() => setTab("Skills")}>
          <div className=" text-xs hover:text-sm">Skills</div>
        </Button>

        <Button icon="flag" onClick={() => setTab("Objective")}>
          <div className=" text-xs hover:text-sm">Objective</div>
        </Button>

        <Button icon="application" onClick={() => setTab("Others")}>
          <div className=" text-xs hover:text-sm">Others</div>
        </Button>
      </div>
      {/* <Button icon="refresh" intent="danger" text="Refresh" /> */}
    </div>
  );
}
