"use client";
import React, { useState, useRef, useEffect } from "react";

import ReactToPrint from "react-to-print";
import { Button, Icon } from "@blueprintjs/core";
import Resume from "./Resume";
import useDragger from "./Match/useDragger";
import ResultBoard from "./Match/ResultBoard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import StatisticBoard from "./Match/StatisticBoard";
import { ButtonGroup } from "@mui/material";
import DisplayResultBoard from "./Match/DisplayResultBoard";
import {
  FORCE_to_UPDATE,
  add_display,
  control_Highlight_Dsiplay,
  init_display,
  rest_display_redux,
} from "@/slices/resumeSlice";

import toast, { Toaster } from "react-hot-toast";

//To store the componentRef.current to MongoDB
import DOMPurify from "dompurify";

import * as htmlToImage from "html-to-image";
import Revalidate from "./Revalidation/Revalidate";
import Statistic from "./Match/Statistic";

import { useSearchParams } from "next/navigation";
import { SkillsState } from "@/slices/skillsSlice";
import {
  Skill_interface,
  Stage_3_skill,
  Stage_3_work,
  Job_Description_interface,
  Stage_3_project,
  Project_Description_interface,
} from "@/utils/interfaces";
import { WorkExpState } from "@/slices/workSlice";
import { ProjectState } from "@/slices/projectsSlice";

const ResumeClient = ({
  resumeID,
  data,
}: {
  resumeID: string | null;
  data?: any;
}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const dispatch = useDispatch();

  const componentRef = useRef<any>(null);

  const stage_3_ls: any = localStorage.getItem("stage_3");
  const matches_ls: any = localStorage.getItem("matches");
  const unmatches_ls: any = localStorage.getItem("unmatches");
  const job_details_ls = localStorage.getItem("job_details");

  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);
  const skill_redux = useSelector((state: RootState) => state.skills);
  const project_redux = useSelector((state: RootState) => state.projects);
  const objective_redux = useSelector((state: RootState) => state.objectives);

  //To show the Statistic here becuz of the format
  const select = useSelector(
    (state: RootState) => state.resume.switch_Statistic
  );

  //initialize in Result Board
  const [dispatchOnce, setOnce] = useState<boolean>(false);

  // useEffect(() => {
  //   // 0 . Only Dispatch Once
  //   // if (dispatchOnce === false) {
  //   //   dispatch(FORCE_to_UPDATE(JSON.stringify(Date())));
  //   //   dispatch(cleanUp_display_redux());
  //   //   setOnce(true);
  //   // }
  //   // 1. initialize ALL job description to 0
  //   if (typeof window !== "undefined") {
  //     JSON.parse(matches_ls).map((each: string) =>
  //       dispatch(init_display({ sentence: each }))
  //     );
  //     JSON.parse(unmatches_ls).map((each: string) =>
  //       dispatch(init_display({ sentence: each }))
  //     );
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [resumeID]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      JSON.parse(matches_ls).map((each: string) =>
        dispatch(init_display({ sentence: each }))
      );
      JSON.parse(unmatches_ls).map((each: string) =>
        dispatch(init_display({ sentence: each }))
      );
    }
    //--------------------------------Skill---------------------------
    if (localStorage.getItem("stage_3")) {
      //-------------Skill-------------------
      JSON.parse(stage_3_ls)?.map((item: Stage_3_skill) =>
        skill_redux?.map((each: SkillsState) =>
          each.index === item.match_index_1st
            ? each?.Skill_list.map((each_2: Skill_interface) =>
                each_2.skillIndex === item.match_index_2nd &&
                each_2.skill === item.technique
                  ? dispatch(
                      add_display({
                        sentence: item.match_sentence,
                        from: "matches",
                      })
                    )
                  : dispatch(
                      add_display({
                        sentence: item.match_sentence,
                        from: "unmatches",
                      })
                    )
              )
            : null
        )
      );
    }
    //--------------------------------Work---------------------------
    if (localStorage.getItem("stage_3")) {
      //-------------Work-------------------
      JSON.parse(stage_3_ls)?.map((item: Stage_3_work) =>
        work_redux?.map((each: WorkExpState) =>
          each.index === item.match_index_1st
            ? each?.JobDescription?.map((each_2: Job_Description_interface) =>
                each_2.rowIndex === item.match_index_2nd &&
                each_2.Row === item.user_data
                  ? dispatch(
                      add_display({
                        sentence: item.match_sentence,
                        from: "matches",
                      })
                    )
                  : dispatch(
                      add_display({
                        sentence: item.match_sentence,
                        from: "unmatches",
                      })
                    )
              )
            : null
        )
      );
    }

    //--------------------------------Project---------------------------
    if (localStorage.getItem("stage_3")) {
      //-------------Project-------------------
      JSON.parse(stage_3_ls)?.map((item: Stage_3_project) =>
        project_redux?.map((each: ProjectState) =>
          each.index === item.match_index_1st
            ? each?.ProjectDescription?.map(
                (each_2: Project_Description_interface) =>
                  each_2.rowIndex === item.match_index_2nd &&
                  each_2.Row === item.user_data
                    ? dispatch(
                        add_display({
                          sentence: item.match_sentence,
                          from: "matches",
                        })
                      )
                    : dispatch(
                        add_display({
                          sentence: item.match_sentence,
                          from: "unmatches",
                        })
                      )
              )
            : null
        )
      );
    }

    return () => {
      // This cleanup function will run when the component unmounts
      dispatch(rest_display_redux()); // Dispatch the resetUser action to reset the state
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage_3_ls, skill_redux, work_redux, project_redux]);

  //----------------Side Bar---------------------------------
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className=" bg-slate-700 relative" key={search}>
      <div
        id="boundary"
        className="flex flex-col border-8 border-green-300 justify-center relative w-full "
      >
        <title>Resume</title>
        <ResultBoard />
        <div className=" h-a4 border-4 relative overflow-y-hidden">
          {/* 1. The tool list */}
          <div className="absolute z-10 right-0 flex">
            <div className={select ? "" : "hidden"}>
              <Statistic whatToGet="stage_3" />
            </div>

            <div className=" flex flex-col">
              <Toaster />
              {sidebarOpen && (
                <div className=" flex flex-col">
                  <ReactToPrint
                    onBeforePrint={() =>
                      (document.title = job_details_ls
                        ? JSON.parse(job_details_ls)?.job_position
                        : "Resume")
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
                              stage_3: localStorage.getItem("stage_3"),
                              matches: localStorage.getItem("matches"),
                              unmatches: localStorage.getItem("unmatches"),
                              job_details: localStorage.getItem("job_details"),
                              resumeID: resumeID,
                              work: work_redux,
                              project: project_redux,
                              skill: skill_redux,
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
                          onMouseEnter={() =>
                            dispatch(
                              control_Highlight_Dsiplay({ select: true })
                            )
                          }
                          onMouseLeave={() =>
                            dispatch(
                              control_Highlight_Dsiplay({ select: false })
                            )
                          }
                        >
                          Print/Save
                        </Button>
                      </ButtonGroup>
                    )}
                    content={() => componentRef.current}
                  />
                  <StatisticBoard />
                  <DisplayResultBoard />
                  <Revalidate />
                </div>
              )}
              <div className=" flex w-full justify-end">
                <Button
                  onClick={toggleSidebar}
                  className="w-8 h-8 p-0 m-0 mb-4 flex justify-end border-2 rounded"
                  minimal
                >
                  <Icon
                    className=" bg-white rounded"
                    icon={sidebarOpen ? "chevron-right" : "chevron-left"}
                  />
                </Button>
              </div>
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
