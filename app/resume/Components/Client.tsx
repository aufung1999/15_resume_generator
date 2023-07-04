"use client";
import React, { useRef } from "react";

import ReactToPrint from "react-to-print";
import { Button } from "@blueprintjs/core";
import Resume from "./Resume";
import Result from "./Match/Result";
import useDragger from "./Match/useDragger";

const ResumeClient = () => {
  const componentRef = useRef<any>();

  return (
    <div className=" bg-gray-300 relative">
      <div className="absolute invisible">
        <ReactToPrint
          removeAfterPrint={true}
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef.current}
        />
      </div>

      <div
        id="boundary"
        className="flex border-8 border-green-300 justify-center relative"
      >
        {/* draggable of "matches" result */}
        <Result id="matches" whatToGet="matches" customedCSS="left-0" />
        {/* draggable of "unmatches" result */}
        <Result
          id="unmatches"
          whatToGet="unmatches"
          customedCSS="right-0 bg-red-400"
        />
        <Resume ref={componentRef} />
      </div>
    </div>
  );
};

export default ResumeClient;
