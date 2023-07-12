import React, { useState } from "react";
import Result from "./Result";
import useDragger from "./useDragger";
import { Paper, ButtonGroup, Button } from "@mui/material";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function ResultBoard() {
  const [display, setDisplay] = useState("UNMATCH");
  //Use this method to force the Functional Component to update whenever the "Button" is clicked
  //Parent Component
  //Children Component: <Result id="matches" ...props>, <Result id="unmatches" ...props>
  const [update, setUpdate] = useState(false);

  const control_highlight_dsiplay = useSelector(
    (state: RootState) => state.resume.control_highlight_dsiplay
  );

  useDragger("move-board");
  return (
    <div
      id="move-board"
      className={control_highlight_dsiplay ? " absolute z-20 " : "hidden"}
    >
      <div className=" bg-white inline-block">
        <ButtonGroup aria-label="Disabled elevation buttons">
          <Button onClick={() => setDisplay("")}>Hide</Button>
          <Button onClick={() => setDisplay("UNMATCH")}>UNMATCH</Button>
          <Button onClick={() => setDisplay("MATCH")}>MATCH</Button>
        </ButtonGroup>
      </div>
      {/* draggable of "matches" result */}
      <Result
        id="matches"
        whatToGet="matches"
        customedCSS={display === "MATCH" ? "left-0 " : "hidden"}
        update={update}
        setUpdate={setUpdate}
      />
      {/* draggable of "unmatches" result */}
      <Result
        id="unmatches"
        whatToGet="unmatches"
        customedCSS={
          display === "UNMATCH" ? "left-0  border-red-500" : "hidden"
        }
        update={update}
        setUpdate={setUpdate}
      />
    </div>
  );
}
