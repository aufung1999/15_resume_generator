"use client";
import React, { useRef } from "react";

import ReactToPrint from "react-to-print";
import { Button } from "@blueprintjs/core";
import Resume from "./Resume";

const ResumeClient = () => {
  const componentRef = useRef<any>();

  return (
    <div className=" bg-gray-300">
      <ReactToPrint
        removeAfterPrint={true}
        trigger={() => <Button>Print this out!</Button>}
        content={() => componentRef.current}
      />
      <div className="border-2 flex justify-center border-red-300">
        <Resume ref={componentRef} />
      </div>
    </div>
  );
};

export default ResumeClient;
