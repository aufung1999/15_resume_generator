import React from "react";
import { Paper, ButtonGroup, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { control_Highlight_Dsiplay } from "@/slices/resumeSlice";

export default function DisplayResultBoard() {
  const dispatch = useDispatch();
  const select = useSelector(
    (state: RootState) => state.resume.control_highlight_dsiplay
  );
  return (
    <div>
      <ButtonGroup
        aria-label="Disabled elevation buttons"
        className="bg-white w-full"
      >
        <Button
          className="w-full "
          onClick={() =>
            dispatch(control_Highlight_Dsiplay({ select: select }))
          }
        >
          Display
        </Button>
      </ButtonGroup>
    </div>
  );
}
