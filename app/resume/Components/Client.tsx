"use client";
import React, { useRef } from "react";

import ReactToPrint from "react-to-print";
import { Button } from "@blueprintjs/core";
import Resume from "./Resume";
import Result from "./Match/Result";

const ResumeClient = () => {
  const componentRef = useRef<any>();

  return (
    <div className=" bg-gray-300 ">
      <ReactToPrint
        removeAfterPrint={true}
        trigger={() => <Button>Print this out!</Button>}
        content={() => componentRef.current}
      />

      <div className="flex border-8 border-green-300  ">
        <Resume ref={componentRef} />
        <div className="w-auto">
          <Result />
        </div>
      </div>
    </div>
  );
};

export default ResumeClient;
