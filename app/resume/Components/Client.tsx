"use client";
import React, { useRef } from "react";

import ReactToPrint from "react-to-print";
import { Button } from "@blueprintjs/core";
import Resume from "./Resume";
import useDragger from "./Match/useDragger";
import ResultBoard from "./Match/ResultBoard";

const ResumeClient = () => {
  const componentRef = useRef<any>();

  return (
    <div className=" bg-gray-300 relative">
      <div className="absolute z-10">
        <ReactToPrint
          removeAfterPrint={true}
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef.current}
        />
      </div>

      <div
        id="boundary"
        className="flex border-8 border-green-300 justify-center relative w-full"
      >
        <ResultBoard />
        <Resume ref={componentRef} />
      </div>
    </div>
  );
};

export default ResumeClient;
