import React from "react";

import { useDispatch } from "react-redux";
import { delete_stage_2 } from "@/slices/analyseSlice";
import DeleteButton from "./DeleteButton";

export default function Stage_2({ stage_2 }: any) {
  const dispatch = useDispatch();
  return (
    <>
      {stage_2?.map((each: string, i: number) => (
        <div className="grid grid-cols-10 gap-1 border" key={i}>
          <div className=" col-span-9 border-2">{each}</div>

          <div className="col-span-1">
            <DeleteButton each={each} />
          </div>
        </div>
      ))}
    </>
  );
}
