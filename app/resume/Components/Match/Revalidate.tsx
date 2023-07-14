import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Paper, ButtonGroup, Button } from "@mui/material";
import { RootState } from "@/store/store";
import { FORCE_to_UPDATE, editResume_stage_4 } from "@/slices/resumeSlice";

export default function Revalidate() {
  const dispatch = useDispatch();

  const work_unmatches = useSelector(
    (state: RootState) => state.resume.stage_4.work
  );

  const work_redux = useSelector((state: RootState) => state.work);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("unmatches")) {
        const stage_3_ls: any = window.localStorage.getItem("stage_3");
        work_redux.map((each) =>
          each.JobDescription.map((each_2) =>
            JSON.parse(stage_3_ls)?.some(
              (item) =>
                each.index === item.match_index_1st &&
                each_2.rowIndex === item.match_index_2nd
            )
              ? null
              : dispatch(
                  editResume_stage_4({
                    index_1st: each.index,
                    index_2nd: each_2.rowIndex,
                    JobDescription: each_2.Row,
                    whichSection: "work",
                  })
                )
          )
        );
      }
    }
  }, [work_redux]);

  const RevalidateHandler = async () => {
    if (typeof window !== "undefined") {
      // get the "unmatches" from the localStorage
      if (localStorage.getItem("unmatches")) {
        const unmatches_ls: any = window.localStorage.getItem("unmatches");

        // Define the input object for fetching
        const fetch_data = {
          user_data: work_unmatches,
          input_data: JSON.parse(unmatches_ls),
        };
        // ----result from the chatgpt API
        const res = await fetch("/api/chatgpt/work", {
          method: "POST",
          body: JSON.stringify(fetch_data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const { data, total_usage } = await res.json();
        // Update the localStorage after revalidation
        if (data) {
          const matches_ls: any = window.localStorage.getItem("matches");
          const stage_3_ls: any = window.localStorage.getItem("stage_3");

          //Process
          const unmatches_revalidated: any[] = JSON.parse(unmatches_ls)?.filter(
            (each: any) =>
              data.find((each_each: any) => each_each.match_sentence === each)
                ?.match_sentence !== each
          );

          const matches_revalidated: any[] = JSON.parse(unmatches_ls)?.filter(
            (each: any) =>
              data.find((each_each: any) => each_each.match_sentence === each)
                ?.match_sentence === each
          );

          // update the fetch object for localStorage of "matches_ls"
          const matches_ls_revalidated = [
            ...JSON.parse(matches_ls),
            ...matches_revalidated,
          ];
          const unmatches_ls_revalidated = unmatches_revalidated;
          const stage_3_ls_revalidated = [...JSON.parse(stage_3_ls), ...data];

          console.log(matches_ls_revalidated);
          console.log(unmatches_ls_revalidated);
          console.log(stage_3_ls_revalidated);
          //update the localStorage of "matches", "unmatches", and "stage_3"
          window.localStorage.setItem(
            "stage_3",
            JSON.stringify(stage_3_ls_revalidated)
          );

          //store the "matches" from chatgpt / other algorithms to localStorage
          window.localStorage.setItem(
            "matches",
            JSON.stringify(matches_ls_revalidated)
          );

          //store the "unmatches" from chatgpt / other algorithms to localStorage
          window.localStorage.setItem(
            "unmatches",
            JSON.stringify(unmatches_ls_revalidated)
          );
          //After everything update the Client side page
          dispatch(FORCE_to_UPDATE(JSON.stringify(Date())));
        }
      }
    }
  };

  return (
    <div
      className={
        "bg-white px-3 py-1 cursor-pointer top-0 z-10 rounded border-2  border-green-500 "
      }
    >
      <div className=" bg-white inline-block">
        <ButtonGroup aria-label=" elevation buttons">
          <Button onClick={RevalidateHandler}>Revalidate</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
