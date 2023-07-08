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
import { control_Highlight_Dsiplay } from "@/slices/resumeSlice";
import Testhtml from "./test/Testhtml";

import toast, { Toaster } from "react-hot-toast";

//To store the componentRef.current to MongoDB
import DOMPurify from "dompurify";

import * as htmlToImage from "html-to-image";

const ResumeClient = () => {
  const dispatch = useDispatch();

  const componentRef = useRef<any>(null);

  return (
    <div className=" bg-gray-300 relative">
      <div className="absolute z-10 right-0 flex flex-col">
        <Toaster />
        <ReactToPrint
          onBeforePrint={() =>
            //because there is a "!" in the reducer, so set the "true" here
            dispatch(control_Highlight_Dsiplay({ select: true }))
          }
          onAfterPrint={async () => {
            //1. convert the html-to-image
            htmlToImage
              .toPng(componentRef.current)
              .then(async (dataUrl) => {
                //2. after getting the string of result, fetch it to mongoDB
                await fetch(`/api/user/resume`, {
                  method: "POST",
                  body: JSON.stringify(dataUrl),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                })
                  .then(() => toast.success("Stored Resume!"))
                  .catch(() => toast.error("Cannot Delete!"));
              })
              .catch((error) => {
                console.error("oops, something went wrong!", error);
              });
          }}
          // removeAfterPrint={true}
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
