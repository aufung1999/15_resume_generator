import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Switch,
  TextArea,
} from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import { FORCE_to_UPDATE } from "@/slices/resumeSlice";
import { RootState } from "@/store/store";

export default function Result({
  id,
  whatToGet,
  customedCSS,
}: {
  id: string;
  whatToGet: string;
  customedCSS: string;
}) {
  const dispatch = useDispatch();
  const force_to_update_redux = useSelector(
    (state: RootState) => state.resume.force_to_update
  );

  const [get, setGet] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(whatToGet)) {
        const newObject: any = window.localStorage.getItem(whatToGet);
        setGet(JSON.parse(newObject));
      }
    }
  }, [force_to_update_redux, whatToGet]);

  const ClickHandler = (deleteIndex: number) => {
    dispatch(FORCE_to_UPDATE(JSON.stringify(Date())));
    switch (whatToGet) {
      case "unmatches":
        const move_to_matches = get[deleteIndex];
        const filtered_array = get.filter((each) => each !== move_to_matches);
        // console.log(filtered_array)
        //update localStorage "unmatches"
        localStorage.setItem("unmatches", JSON.stringify(filtered_array));
        //update localStorage "matches"
        const newObject: any = window.localStorage.getItem("matches");
        const new_matches: any[] = [...JSON.parse(newObject), move_to_matches];
        localStorage.setItem("matches", JSON.stringify(new_matches));
        return;
      case "matches":
        return;
    }
  };

  return (
    <div
      className={
        "bg-white px-3 py-1 cursor-pointer top-0 z-10 rounded border-2  border-green-500 " +
        customedCSS
      }
      id={id}
      content="hi"
    >
      {get?.map((each, i) => (
        <div key={i} className="flex">
          <div> {i}</div>&nbsp;
          <div className=" text-xs">{each}</div>
          <div className={whatToGet === "unmatches" ? " " : "hidden"}>
            <Button onClick={() => ClickHandler(i)}>-</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
