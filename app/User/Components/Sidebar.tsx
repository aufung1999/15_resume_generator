import React from "react";

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

export default function Sidebar() {
  return (
    <div className="border border-blue-600 ">
      <div className=" flex justify-between border w-full">
        <Button icon="id-number">
          <div className=" text-xs hover:text-sm">Contact</div>
        </Button>

        <Button icon="build">
          <div className=" text-xs hover:text-sm">Work</div>
        </Button>

        <Button icon="learning">
          <div className=" text-xs hover:text-sm">Education</div>
        </Button>

        <Button icon="star">
          <div className=" text-xs hover:text-sm">Achievement</div>
        </Button>

        <Button icon="property">
          <div className=" text-xs hover:text-sm">Skills</div>
        </Button>

        <Button icon="flag">
          <div className=" text-xs hover:text-sm">Objective</div>
        </Button>

        <Button icon="application">
          <div className=" text-xs hover:text-sm">Others</div>
        </Button>
      </div>
      {/* <Button icon="refresh" intent="danger" text="Refresh" /> */}
    </div>
  );
}
