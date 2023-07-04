import React, { useState } from "react";
import Result from "./Result";
import useDragger from "./useDragger";
import { Paper, ButtonGroup, Button } from "@mui/material";

export default function ResultBoard() {
  const [display, setDisplay] = useState("UNMATCH");

  useDragger("move-board");
  return (
    <div id="move-board" className="border-8 absolute z-10">
      <Paper elevation={1}>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button onClick={() => setDisplay("UNMATCH")}>UNMATCH</Button>
          <Button onClick={() => setDisplay("MATCH")}>MATCH</Button>
        </ButtonGroup>
        {/* draggable of "matches" result */}
        <Result
          id="matches"
          whatToGet="matches"
          customedCSS={display === "MATCH" ? "left-0 " : "hidden"}
        />
        {/* draggable of "unmatches" result */}
        <Result
          id="unmatches"
          whatToGet="unmatches"
          customedCSS={display === "UNMATCH" ? "left-0 bg-red-400 " : "hidden"}
        />
      </Paper>
    </div>
  );
}
