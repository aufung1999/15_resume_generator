import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Paper, ButtonGroup, Button } from "@mui/material";
import { RootState } from "@/store/store";
import { editResume_stage_4 } from "@/slices/resumeSlice";
export default function Revalidate() {
  const dispatch = useDispatch();

  const work_unmatches = useSelector(
    (state: RootState) => state.resume.stage_4.work
  );

  const work_redux = useSelector((state: RootState) => state.work);

  //set Result
  const [result, setRes] = useState<any>([]);

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
                    Description: each_2.Row,
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
        const res = await fetch("/api/chatgpt", {
          method: "POST",
          body: JSON.stringify(fetch_data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await res.json();
        //=====Get the result and display=====
        setRes(data);
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
