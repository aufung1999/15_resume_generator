import React from "react";

import { Paper, ButtonGroup, Button } from "@mui/material";
export default function Revalidate() {
  const RevalidateHandler = () => {
    // get the "unmatches" from the localStorage
    // get the Description from work/projects which are not higlighted

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
