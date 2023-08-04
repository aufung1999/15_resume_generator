import React, { useState } from "react";
import { Paper, ButtonGroup, Button } from "@mui/material";
import { switch_Statistic } from "@/slices/resumeSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Statistic from "./Statistic";

export default function StatisticBoard() {
  const dispatch = useDispatch();

  const select = useSelector(
    (state: RootState) => state.resume.switch_Statistic
  );
  return (
    <div className="flex w-full ">
      <ButtonGroup
        aria-label="Disabled elevation buttons"
        className="bg-white w-full"
      >
        <Button
          className=" w-full"
          onClick={() => dispatch(switch_Statistic({ select: select }))}
        >
          Statistic
        </Button>
      </ButtonGroup>
    </div>
  );
}
