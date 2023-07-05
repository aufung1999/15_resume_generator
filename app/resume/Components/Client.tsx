"use client";
import React, { useRef } from "react";

import ReactToPrint from "react-to-print";
import { Button } from "@blueprintjs/core";
import Resume from "./Resume";
import useDragger from "./Match/useDragger";
import ResultBoard from "./Match/ResultBoard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import StatisticBoard from "./Match/StatisticBoard";
import { ButtonGroup } from "@mui/material";
import DisplayResultBoard from "./Match/DisplayResultBoard";

const ResumeClient = () => {
  const dispatch = useDispatch();

  const select = useSelector((state: RootState) => state.resume.switch_Result);

  const componentRef = useRef<any>();

  return (
    <div className=" bg-gray-300 relative">
      <div className="absolute z-10 right-0 flex flex-col">
        <ReactToPrint
          removeAfterPrint={true}
          trigger={() => (
            <ButtonGroup
              aria-label="Disabled elevation buttons"
              className="bg-white inline-block"
            >
              <Button>Print this out!</Button>
            </ButtonGroup>
          )}
          content={() => componentRef.current}
        />
        <StatisticBoard />
        <DisplayResultBoard />
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
