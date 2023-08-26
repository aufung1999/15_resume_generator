"use client";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { delete_stage_2 } from "@/slices/analyseSlice";
import { Button } from "@blueprintjs/core";

export default function DeleteButton({ each }: { each: string }) {
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);

  return (
    <div className="transition-all w-full h-full">
      {clicked ? (
        <Button
          className="border-2 h-full text-red-500 bg-white hover:bg-red-500 hover:text-white p-2"
          onClick={() => (
            dispatch(delete_stage_2({ sentence: each })), setClicked(false)
          )}
          //   onClick={() => setClicked(true)}
        >
          DELETE
        </Button>
      ) : (
        <Button
          className="border-2 h-full text-red-500 bg-white hover:bg-red-500 hover:text-white p-2"
          //   onClick={() => dispatch(delete_stage_2({ sentence: each }))}
          onClick={() => setClicked(true)}
        >
          delete?
        </Button>
      )}
    </div>
  );
}
