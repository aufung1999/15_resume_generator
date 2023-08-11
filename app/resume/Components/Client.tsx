"use client";
import React, { useRef, useEffect } from "react";

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
import {
  add_display,
  cleanUp_display_redux,
  control_Highlight_Dsiplay,
} from "@/slices/resumeSlice";
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
  const matches_ls: any = window.localStorage.getItem("matches");
  const unmatches_ls: any = window.localStorage.getItem("unmatches");
  const job_details_ls = window.localStorage.getItem("job_details");

  //To show the Statistic here becuz of the format
  const select = useSelector(
    (state: RootState) => state.resume.switch_Statistic
  );
  // const display_redux = useSelector((state: RootState) => state.resume.display);

  useEffect(() => {
    //clean up the resume redux display
    dispatch(cleanUp_display_redux());
    // 1. initialize ALL job description to 0
    if (typeof window !== "undefined") {
      if (localStorage.getItem("unmatches")) {
        JSON.parse(unmatches_ls)?.map((each: string | null) =>
          dispatch(add_display({ sentence: each, from: "unmatches" }))
        );
      }
      if (localStorage.getItem("matches")) {
        JSON.parse(matches_ls)?.map((each: string | null) =>
          dispatch(add_display({ sentence: each, from: "unmatches" }))
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches_ls, unmatches_ls]);

  // useEffect(() => {
  //   dispatch(cleanUp_display_redux());
  // }, [search, searchParams]);

  return (
    <div className=" bg-gray-300 relative" key={search}>
      <div
        id="boundary"
        className="flex flex-col border-8 border-green-300 justify-center relative w-full "
      >
        <ResultBoard />
        <div className=" h-a4 border-4 relative">
          {/* 1. The tool list */}
          <div className="absolute z-10 right-0 flex">
            <div className={select ? "" : "hidden"}>
              <Statistic whatToGet="stage_3" />
            </div>

            <div className=" flex flex-col">
              <Toaster />

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
                    className="bg-white w-full"
                  >
                    <Button
                      className="w-full"
                      // onMouseEnter={() =>
                      //   dispatch(control_Highlight_Dsiplay({ select: true }))
                      // }
                      // onMouseLeave={() =>
                      //   dispatch(control_Highlight_Dsiplay({ select: false }))
                      // }
                    >
                      Print this out!
                    </Button>
                  </ButtonGroup>
                )}
                content={() => componentRef.current}
              />
              <StatisticBoard />
              <DisplayResultBoard />
              <Revalidate />
            </div>
          </div>
          {/* 2. Resume Part */}
          <div className="flex justify-center">
            <Resume ref={componentRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeClient;
