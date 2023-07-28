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
import Revalidate from "./Revalidation/Revalidate";
import Statistic from "./Match/Statistic";

import { useSearchParams } from "next/navigation";

const ResumeClient = ({ resumeID }: { resumeID: string | null }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const dispatch = useDispatch();

  const componentRef = useRef<any>(null);

  //save all the localStorage data to Database
  const stage_3_ls = window.localStorage.getItem("stage_3");
  const matches_ls = window.localStorage.getItem("matches");
  const unmatches_ls = window.localStorage.getItem("unmatches");
  const job_details_ls = window.localStorage.getItem("job_details");

  //To show the Statistic here becuz of the format
  const select = useSelector(
    (state: RootState) => state.resume.switch_Statistic
  );

  return (
    <div className=" bg-gray-300 relative" key={search}>
      <div className="absolute z-10 right-0 flex">
        <div className={select ? "" : "hidden"}>
          <Statistic whatToGet="stage_3" />
        </div>

        <div className=" flex flex-col">
          <Toaster />
          <div
          className="w-full"
            onMouseEnter={() =>
              dispatch(control_Highlight_Dsiplay({ select: true }))
            }
          >
            <ReactToPrint

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
                        resumeID: resumeID,
                      }),
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                      },
                    })
                      .then((res) => res.json())
                      .then((data) => toast.success(data?.message))
                      // .then((res) => toast.success(res?.json().message))
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
                  <Button className="w-full">Print this out!</Button>
                </ButtonGroup>
              )}
              content={() => componentRef.current}
            />
          </div>
          <StatisticBoard />
          <DisplayResultBoard />
          <Revalidate />
        </div>
      </div>

      <div
        id="boundary"
        className="flex border-8 border-green-300 justify-center relative w-full "
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
