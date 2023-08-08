"use client";
import React, { useState, useEffect, useRef } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Button, mergeRefs, Popover, Tag } from "@blueprintjs/core";
import { Tooltip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { add_display } from "@/slices/resumeSlice";
import { RootState } from "@/store/store";

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

  const [on, setOn] = useState<boolean>(false);
  const [outline, setOutline] = useState<boolean>(false);

  const [target, setTarget] = useState<any>(null);
  const [matches, setMatches] = useState<any>(null);
  const [years, setYears] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    let temp_array: any[] = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("stage_3")) {
        const stage_3_ls: any = window.localStorage.getItem("stage_3");

        switch (whichSection) {
          case "skill":
            JSON.parse(stage_3_ls).map((each: any) => {
              //index
              // each.match_index_1st === index_1st &&
              // each.match_index_2nd === index_2nd &&
              //or only text
              each.technique === description &&
              //To avoid duplication
              temp_array.includes(each.match_sentence) === false
                ? (setOn(true),
                  setOutline(true),
                  temp_array.push(each.match_sentence),
                  dispatch(add_display(each.match_sentence)))
                : //This means that the row description is not included in the "stage_3" ----^
                  null;
            });
          case "work":
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
                  temp_array.push(each.match_sentence),
                  dispatch(add_display(each.match_sentence)))
                : //This means that the row description is not included in the "stage_3" ----^
                  null;
            });

          case "project":
            // Conditional-case based on if the index_2nd exists or not
            // *****NOT exist*****
            if (index_2nd === undefined || index_2nd === null) {
              JSON.parse(stage_3_ls).map((each: any) =>
                //index
                each.match_index === index_1st &&
                //or only text
                each.user_data === description &&
                //To avoid duplication
                temp_array.includes(each.match_sentence) === false
                  ? (setOn(true),
                    setOutline(true),
                    temp_array.push(each.match_sentence),
                    dispatch(add_display(each.match_sentence)))
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
                    temp_array.push(each.match_sentence),
                    dispatch(add_display(each.match_sentence)))
                  : //This means that the row description is not included in the "stage_3" ----^
                    null;
              });
            }
        }
      }
      //Get "matches" from localStorage
      if (localStorage.getItem("matches")) {
        const matches_ls: any = window.localStorage.getItem("matches");
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
    };
  }, [
    force_to_update_redux,
    whichSection,
    dispatch,
    index_1st,
    index_2nd,
    description,
  ]);

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
            // console.log("hi: ");
            setYears(Number(find_res[i]));
          }
          i--;
        }
        // console.log("**********************************");
      }
    }
  }, [target, matches]);

  return (
    <div
      className={`${on && control_highlight_dsiplay ? " bg-yellow-300" : ""} ${
        whichSection === "skill" && outline
          ? " border-b-2 border-color-[##a9a9a9]"
          : ""
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
                  </div>
                  <div className="flex border h-full z-20">
                    <div>
                      {Number.isInteger(years) && (
                        <Button
                          onClick={() => setYears((prev: number) => prev + 1)}
                        >
                          +
                        </Button>
                      )}
                    </div>
                    <div className="h-full flex flex-col items-center justify-center border text-xl px-5">
                      {years}
                    </div>
                    <div>
                      {Number.isInteger(years) && (
                        <Button
                          onClick={() => setYears((prev: number) => prev - 1)}
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
                  {matches?.indexOf(each)}:{each}
                </div>
              ))}
            </div>
          }
        >
          <div>
            {text}
            {whichSection === "skill" && years && <> ({years}+)</>}
          </div>
        </Tooltip>
      ) : (
        // border-b-2 border-color-[##a9a9a9]
        <div>
          {text}
          {whichSection === "skill" && years && <> ({years}+)</>}
        </div>
      )}
    </div>
  );
}
