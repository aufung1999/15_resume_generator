import React, { useState } from "react";
import Result from "./Result";
import useDragger from "./useDragger";
import { Paper, ButtonGroup, Button } from "@mui/material";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Result_alt from "./Result_alt";

export default function ResultBoard() {
  const [display, setDisplay] = useState("UNMATCH");

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
      {/* Method 1 */}
      {/* <Result
        id="matches"
        whatToGet="matches"
        customedCSS={display === "MATCH" ? "left-0 " : "hidden"}
      />
      <Result
        id="unmatches"
        whatToGet="unmatches"
        customedCSS={
          display === "UNMATCH" ? "left-0  border-red-500" : "hidden"
        }
      /> */}
      {/* Method 2 */}
      <Result_alt
        id="matches"
        whatToGet="matches"
        customedCSS={display === "MATCH" ? "left-0 " : "hidden"}
      />
      {/* draggable of "unmatches" result */}
      <Result_alt
        id="unmatches"
        whatToGet="unmatches"
        customedCSS={
          display === "UNMATCH" ? "left-0  border-red-500" : "hidden"
        }
      />
    </div>
  );
}
