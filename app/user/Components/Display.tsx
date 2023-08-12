import { editDispay_Format } from "@/slices/controlSlice";
import { RootState } from "@/store/store";
import { Button } from "@blueprintjs/core";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";

export default function Display() {
  const dispatch = useDispatch();
  const dispay_format_redux = useSelector(
    (state: RootState) => state.control.dispay_format
  );
  return (
    <div className=" flex py-2">
      {" "}
      <Button
        className=" bg-red-400 inline-block"
        value="picture"
        onClick={() => dispatch(editDispay_Format("picture"))}
        style={
          dispay_format_redux === "picture"
            ? { background: "gray" }
            : { background: "white" }
        }
      >
        <PhotoLibraryOutlinedIcon />
      </Button>
      <Button
        className=" bg-red-400"
        value="list"
        onClick={() => dispatch(editDispay_Format("list"))}
        style={
          dispay_format_redux === "list"
            ? { background: "gray" }
            : { background: "white" }
        }
      >
        <FormatListNumberedOutlinedIcon />
      </Button>
    </div>
  );
}
