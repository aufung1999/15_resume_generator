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
import Revalidate from "./Match/Revalidate";

const ResumeClient = () => {
  const dispatch = useDispatch();

  const componentRef = useRef<any>(null);

  //save all the localStorage data to Database
  const stage_3_ls = window.localStorage.getItem("stage_3");
  const matches_ls = window.localStorage.getItem("matches");
  const unmatches_ls = window.localStorage.getItem("unmatches");
  const job_details_ls = window.localStorage.getItem("job_details");

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
                  //need to stringify all the thing BEFORE send to API
                  body: JSON.stringify({
                    image: dataUrl,
                    stage_3: stage_3_ls,
                    matches: matches_ls,
                    unmatches: unmatches_ls,
                    job_details: job_details_ls,
                  }),
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
        <Revalidate />
      </div>

      <div
        id="boundary"
        className="flex border-8 border-green-300 justify-center relative w-full"
      >
        <ResultBoard />
        <div className=" h-a4 border-4">
          <Resume ref={componentRef} />
        </div>
      </div>
    </div>
  );
};

export default ResumeClient;
