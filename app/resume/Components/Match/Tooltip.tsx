"use client";
import React, { useState, useEffect } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Button, mergeRefs, Popover, Tag } from "@blueprintjs/core";
import { Tooltip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { add_skill_match, editResume_stage_4 } from "@/slices/resumeSlice";
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

  const [on, setOn] = useState<any>(false);
  const [target, setTarget] = useState<any>([]);
  const [matches, setMatches] = useState<any>(null);

  useEffect(() => {
    let temp_array: any[] = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("stage_3")) {
        const newObject: any = window.localStorage.getItem("stage_3");
        // Conditional-case based on if the index_2nd exists or not
        // *****NOT exist*****
        if (index_2nd === undefined || index_2nd === null) {
          JSON.parse(newObject).map((each: any) =>
            each.match_index === index_1st &&
            //To avoid duplication
            temp_array.includes(each.match_sentence) === false
              ? (setOn(true), temp_array.push(each.match_sentence))
              : //This means that the row description is not included in the "stage_3" ----v
                null
          );
        }
        // *****Exist*****
        if (index_2nd) {
          JSON.parse(newObject).map((each: any) => {
            each.match_index_1st === index_1st &&
            each.match_index_2nd === index_2nd &&
            //To avoid duplication
            temp_array.includes(each.match_sentence) === false
              ? (setOn(true), temp_array.push(each.match_sentence))
              : //This means that the row description is not included in the "stage_3" ----^
                null;
          });
        }
      }
      //Get "matches" from localStorage
      if (localStorage.getItem("matches")) {
        const newObject: any = window.localStorage.getItem("matches");
        //sorting for "temp_array"
        temp_array.sort((a, b) =>
          JSON.parse(newObject).indexOf(a) > JSON.parse(newObject).indexOf(b)
            ? 1
            : -1
        );
        //pass the synchronous "temp_array" variable to a asynchronous state "matches"
        setMatches(JSON.parse(newObject));
      }
      //pass the synchronous "temp_array" variable to a asynchronous state "target"
      setTarget(temp_array);
    }
  }, [force_to_update_redux, index_1st, index_2nd]);
  return (
    <>
      <div className={on && control_highlight_dsiplay ? " bg-yellow-300" : ""}>
        {on && control_highlight_dsiplay ? (
          <Tooltip
            title={
              <>
                {matches?.map((each: string, i: number) => (
                  <div
                    key={i}
                    className={
                      target.includes(each) ? " font-semibold" : "text-gray-300"
                    }
                  >
                    {target.includes(each) && <span>✔️</span>}
                    {matches.indexOf(each)}:{each}
                  </div>
                ))}
              </>
            }
          >
            {text}
          </Tooltip>
        ) : (
          <div>
            {text}
            {/* dispatch the thing to Redux */}
          </div>
        )}
      </div>
    </>
  );
}
