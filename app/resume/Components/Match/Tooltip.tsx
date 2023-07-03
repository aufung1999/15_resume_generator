import React, { useState, useEffect } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Button, mergeRefs, Popover, Tag } from "@blueprintjs/core";
import { Tooltip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { add_skill_match } from "@/slices/resumeSlice";

export default function CustomedTooltip({ index_1st, index_2nd, text }): {
  index_1st: string | any;
  index_2nd: string | any;
  text: string | any;
} {
  const dispatch = useDispatch();
  const [on, setOn] = useState<any>(false);
  const [target, setTarget] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("stage_3")) {
        const newObject: any = window.localStorage.getItem("stage_3");
        // Conditional-case based on if the index_2nd exists or not
        // *****NOT exist*****
        if (index_2nd === undefined || index_2nd === null) {
          const find = JSON.parse(newObject).find(
            (each: any) => each.match_index === index_1st
          );
          find
            ? (setOn(true),
              setTarget(find),
              dispatch(add_skill_match({ match: find })))
            : null;
        }
        // *****Exist*****
        if (index_2nd) {
          const find = JSON.parse(newObject).find(
            (each: any) =>
              each.match_index_1st === index_1st &&
              each.match_index_2nd === index_2nd
          );
          find
            ? (setOn(true),
              setTarget(find),
              dispatch(add_skill_match({ match: find })))
            : null;
        }
      }
    }
  }, []);
  return (
    <div className={on ? " bg-yellow-300" : ""}>
      {on ? (
        <Tooltip title={target.match_sentence}> {text}</Tooltip>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
}
