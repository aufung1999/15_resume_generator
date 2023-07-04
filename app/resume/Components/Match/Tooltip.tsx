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
  index_1st: any;
  index_2nd: any;
  text: any;
}) {
  const dispatch = useDispatch();
  const [on, setOn] = useState<any>(false);
  const [target, setTarget] = useState<any>([]);

  const [matches, setMatches] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("stage_3")) {
        const newObject: any = window.localStorage.getItem("stage_3");
        // Conditional-case based on if the index_2nd exists or not
        // *****NOT exist*****
        if (index_2nd === undefined || index_2nd === null) {
          JSON.parse(newObject).map((each: any) =>
            each.match_index === index_1st
              ? (setOn(true),
                setTarget((oldArray: string[]) => [
                  ...oldArray,
                  each.match_sentence,
                ]))
              : null
          );
        }
        // *****Exist*****
        if (index_2nd) {
          JSON.parse(newObject).map((each: any) => {
            each.match_index_1st === index_1st &&
            each.match_index_2nd === index_2nd
              ? (setOn(true),
                setTarget((oldArray: string[]) => [
                  ...oldArray,
                  each.match_sentence,
                ]))
              : null;
          });
        }
      }
      //Get "matches" from localStorage
      if (localStorage.getItem("matches")) {
        const newObject: any = window.localStorage.getItem("matches");
        setMatches(JSON.parse(newObject));
      }
    }
  }, []);
  return (
    <div className={on ? " bg-yellow-300" : ""}>
      {on ? (
        <Tooltip
          title={target?.map((each: any, i: number) => (
            <div key={i}>{matches.indexOf(each)}</div>
          ))}
        >
          {text}
        </Tooltip>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
}
