"use client";
import React, { useState, useEffect, useRef } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Button, mergeRefs, Tag } from "@blueprintjs/core";
import { Tooltip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import {
  Switc_years_in_skill_show,
  add_display,
  remove_display,
} from "@/slices/resumeSlice";
import { RootState } from "@/store/store";
import extractTerms from "@/components/analyze/Functions/extractTerms";
import {
  Job_Description_interface,
  Project_Description_interface,
  Skill_interface,
  Stage_3_project,
  Stage_3_skill,
  Stage_3_work,
} from "@/utils/interfaces";
import { SkillsState, addYears, subtractYears } from "@/slices/skillsSlice";
import { WorkExpState } from "@/slices/workSlice";
import { ProjectState } from "@/slices/projectsSlice";

export default function CustomedTooltip({
  index_1st,
  index_2nd,
  description,
  text,
  whichSection,
}: {
  index_1st: string | any;
  index_2nd: string | any;
  description?: string | any;
  text: string | any;
  whichSection: string | any;
}) {
  const control_highlight_dsiplay = useSelector(
    (state: RootState) => state.resume.control_highlight_dsiplay
  );
  const force_to_update_redux = useSelector(
    (state: RootState) => state.resume.force_to_update
  );
  const hover_des_redux = useSelector(
    (state: RootState) => state.resume.hover_des
  );
  const skill_years_redux = useSelector(
    (state: RootState) =>
      state.skills
        ?.map((each) =>
          each.Skill_list?.find(
            (skill) =>
              each.index === index_1st &&
              skill.skillIndex === index_2nd &&
              skill.skill === description
          )
        )
        .filter(Boolean)[0]?.years
  );

  const [on, setOn] = useState<boolean | null>(null);
  const [outline, setOutline] = useState<boolean>(false);
  const [bold, setBold] = useState<boolean>(false);

  const [target, setTarget] = useState<any>(null);
  const [matches, setMatches] = useState<any>(null);

  const stage_3_ls: any = localStorage.getItem("stage_3");

  const dispatch = useDispatch();

  let temp_array: any[] = [];

  //---------------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("stage_3")) {
        const stage_3_ls: any = localStorage.getItem("stage_3");

        switch (whichSection) {
          case "skill":
            JSON.parse(stage_3_ls).map((each: any) => {
              //index
              // each.match_index_1st === index_1st &&
              // each.match_index_2nd === index_2nd &&
              //or only text
              each.technique === description
              // &&
              // //To avoid duplication
              // temp_array.includes(each.match_sentence) === false
                ? (setOn(true),
                  setOutline(true),
                  temp_array.push(each.match_sentence))
                : //This means that the row description is not included in the "stage_3" ----^
                  null;
            });
            break;
          case "work":
            // console.log("description: " + description);
            JSON.parse(stage_3_ls).map((each: any) => {
              //index
              // each.match_index_1st === index_1st &&
              // each.match_index_2nd === index_2nd
              // console.log("============================");
              JSON.stringify(each.user_data) === JSON.stringify(description) &&
              //To avoid duplication
              temp_array.includes(each.match_sentence) === false
                ? (setOn(true),
                  setOutline(true),
                  temp_array.push(each.match_sentence))
                : //This means that the row description is not included in the "stage_3" ----^
                  null;
            });
            break;
          case "project":
            // Conditional-case based on if the index_2nd exists or not
            // *****NOT exist*****
            if (index_2nd === undefined || index_2nd === null) {
              JSON.parse(stage_3_ls).map((each: any) =>
                //index
                each.match_index_1st === index_1st &&
                each.match_index_2nd === null &&
                //or only text
                extractTerms(description, "project_redux")?.includes(
                  each.technique
                ) &&
                //To avoid duplication
                temp_array.includes(each.match_sentence) === false
                  ? (setOn(true),
                    setOutline(true),
                    temp_array.push(each.match_sentence))
                  : //This means that the row description is not included in the "stage_3" ----v
                    null
              );
            }
            // *****Exist*****
            if (index_2nd) {
              JSON.parse(stage_3_ls).map((each: any) => {
                //index
                // each.match_index_1st === index_1st &&
                // each.match_index_2nd === index_2nd &&
                //or only text
                each.user_data === description &&
                //To avoid duplication
                temp_array.includes(each.match_sentence) === false
                  ? (setOn(true),
                    setOutline(true),
                    temp_array.push(each.match_sentence))
                  : //This means that the row description is not included in the "stage_3" ----^
                    null;
              });
            }
            break;
        }
      }
      //Get "matches" from localStorage
      if (localStorage.getItem("matches")) {
        const matches_ls: any = localStorage.getItem("matches");
        //sorting for "temp_array"
        temp_array.sort((a, b) =>
          JSON.parse(matches_ls).indexOf(a) > JSON.parse(matches_ls).indexOf(b)
            ? 1
            : -1
        );
        //pass the synchronous "temp_array" variable to a asynchronous state "matches"
        setMatches(JSON.parse(matches_ls));
      }
      //pass the synchronous "temp_array" variable to a asynchronous state "target"

      setTarget(temp_array);
    }

    return () => {
      setOn(false);
      setOutline(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [force_to_update_redux]);

  //-------------------------------------------
  const [change, isChange] = useState<boolean>(false);
  useEffect(() => {
    isChange(!change);
    if (typeof window !== "undefined") {
      if (localStorage.getItem("stage_3")) {
        const stage_3_ls: any = localStorage.getItem("stage_3");

        switch (whichSection) {
          case "skill":
            JSON.parse(stage_3_ls).map((each: any) => {
              //index
              each.match_index_1st === index_1st &&
              each.match_index_2nd === index_2nd &&
              //or only text
              each.technique === description &&
              //To avoid duplication
              temp_array.includes(each.match_sentence) === false
                ? (setOn(true), setOutline(true))
                : //This means that the row description is not included in the "stage_3" ----^
                  null;
            });
            break;
          case "work":
            // console.log("description: " + description);
            JSON.parse(stage_3_ls).map((each: any) => {
              each.match_index_1st === index_1st &&
              each.match_index_2nd === index_2nd &&
              JSON.stringify(each.user_data) === JSON.stringify(description) &&
              //To avoid duplication
              temp_array.includes(each.match_sentence) === false
                ? (setOn(true), setOutline(true))
                : //This means that the row description is not included in the "stage_3" ----^
                  null;
            });
            break;
          case "project":
            // Conditional-case based on if the index_2nd exists or not
            // *****NOT exist*****
            if (index_2nd === undefined || index_2nd === null) {
              JSON.parse(stage_3_ls).map((each: any) =>
                //index
                each.match_index_1st === index_1st &&
                each.match_index_2nd === null &&
                //or only text
                extractTerms(description, "project_redux")?.includes(
                  each.technique
                ) &&
                //To avoid duplication
                temp_array.includes(each.match_sentence) === false
                  ? (setOn(true), setOutline(true))
                  : //This means that the row description is not included in the "stage_3" ----v
                    null
              );
            }
            // *****Exist*****
            if (index_2nd) {
              JSON.parse(stage_3_ls).map((each: any) => {
                //index
                each.match_index_1st === index_1st &&
                each.match_index_2nd === index_2nd &&
                //or only text
                each.user_data === description &&
                //To avoid duplication
                temp_array.includes(each.match_sentence) === false
                  ? (setOn(true), setOutline(true))
                  : //This means that the row description is not included in the "stage_3" ----^
                    null;
              });
            }
            break;
        }
      }
    }

    return () => {
      setOn(false);
      setOutline(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, text, skill_years_redux]);

  //-------------------------------------
  //-------------------------------------
  //-------------------------------------

  //-------------------------------------
  //-------------------------------------
  //-------------------------------------

  // local property to change the year
  useEffect(() => {
    if (matches && target) {
      const find_res = matches?.find((each: string, i: number) =>
        target?.includes(each)
      );

      if (
        find_res
          ?.split(" ")
          .map((each: string) => each.toLowerCase())
          .includes("years") ||
        find_res
          ?.split(" ")
          .map((each: string) => each.toLowerCase())
          .includes("year")
      ) {
        // console.log("**********************************");
        let i = find_res.indexOf("year");
        while (0 <= i) {
          if (
            Number.isInteger(Number(find_res[i])) &&
            Number(find_res[i]) >= 1
          ) {
            dispatch(
              addYears({
                index: index_1st,
                skillIndex: index_2nd,
                years: Number(find_res[i]),
              })
            );
          }
          i--;
        }
        // console.log("**********************************");
      }
    }
  }, [target, matches]);

  //-------------------------Track if the years
  useEffect(() => {
    if (whichSection === "skill") {
      // console.log("dispatch");
      if (skill_years_redux) {
        switch (true) {
          case skill_years_redux === 0:
            console.log("skill_years_redux: " + skill_years_redux);
            dispatch(
              Switc_years_in_skill_show({
                isSwitch: false,
                description: description,
              })
            );
            break;
          case skill_years_redux > 0:
            dispatch(
              Switc_years_in_skill_show({
                isSwitch: true,
                description: description,
              })
            );
            break;
        }
      }
    }
  }, [skill_years_redux]);

  return (
    <div
      className={` pb-0 ${
        hover_des_redux === "" && on && control_highlight_dsiplay
          ? " bg-yellow-300"
          : ""
      } ${
        whichSection === "skill" && outline
          ? " border-b-2 border-slate-300"
          : ""
      } ${whichSection === "skill" && bold ? " font-bold" : ""} ${
        target?.includes(hover_des_redux) ? " bg-green-300" : ""
      }`}
    >
      {on && control_highlight_dsiplay ? (
        <Tooltip
          title={
            <div>
              {whichSection === "skill" && (
                <div className="flex justify-between">
                  <div className="">
                    <Button onClick={() => setOutline(!outline)}>
                      Underline
                    </Button>
                    <Button onClick={() => setBold(!bold)}>Bold</Button>
                  </div>
                  <div className="flex border h-full z-20">
                    <div>
                      {skill_years_redux !== null &&
                        skill_years_redux !== undefined && (
                          <Button
                            onClick={() =>
                              dispatch(
                                addYears({
                                  index: index_1st,
                                  skillIndex: index_2nd,
                                  years: Number(skill_years_redux) + 1,
                                })
                              )
                            }
                          >
                            +
                          </Button>
                        )}
                    </div>
                    <div className="h-full flex flex-col items-center justify-center border text-xl px-5">
                      {skill_years_redux && skill_years_redux}
                    </div>
                    <div>
                      {skill_years_redux !== null &&
                        skill_years_redux !== undefined && (
                          <Button
                            onClick={() =>
                              dispatch(
                                subtractYears({
                                  index: index_1st,
                                  skillIndex: index_2nd,
                                  years: Number(skill_years_redux) - 1,
                                })
                              )
                            }
                          >
                            -
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              )}
              {matches?.map((each: string, i: number) => (
                <div
                  key={i}
                  className={
                    target?.includes(each) ? " font-semibold" : "text-gray-300"
                  }
                >
                  {target?.includes(each) && <span>✔️</span>}
                  {matches?.indexOf(each) + 1}:{each}
                </div>
              ))}
            </div>
          }
        >
          <div>
            {text}
            {skill_years_redux !== null &&
              skill_years_redux !== undefined &&
              whichSection === "skill" &&
              skill_years_redux > 0 && <> ({skill_years_redux}+)</>}
          </div>
        </Tooltip>
      ) : (
        // border-b-2 border-color-[##a9a9a9]
        <div>
          {text}
          {skill_years_redux !== null &&
            skill_years_redux !== undefined &&
            whichSection === "skill" &&
            skill_years_redux > 0 && <> ({skill_years_redux}+)</>}
        </div>
      )}
    </div>
  );
}
