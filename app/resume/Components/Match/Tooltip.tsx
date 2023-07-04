"use client";
import React, { useState, useEffect } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Button, mergeRefs, Popover, Tag } from "@blueprintjs/core";
import { Tooltip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { add_skill_match } from "@/slices/resumeSlice";

export default function CustomedTooltip({
  index_1st,
  index_2nd,
  text,
}: {
  index_1st: string | any;
  index_2nd: string | any;
  text: string | any;
}) {
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
              : null
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
              : null;
          });
        }
      }
      //Get "matches" from localStorage
      if (localStorage.getItem("matches")) {
        const newObject: any = window.localStorage.getItem("matches");
        //sorting for "temp_array"
        temp_array.sort((a, b) =>
          newObject.indexOf(a) > newObject.indexOf(b) ? 1 : -1
        );
        //pass the synchronous "temp_array" variable to a asynchronous state "matches"
        setMatches(JSON.parse(newObject));
      }
      //pass the synchronous "temp_array" variable to a asynchronous state "target"
      setTarget(temp_array);
    }
  }, []);
  return (
    <>
      <div className={on ? " bg-yellow-300" : ""}>
        {on ? (
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
          <div>{text}</div>
        )}
      </div>
    </>
  );
}
