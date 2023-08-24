import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  Icon,
  InputGroup,
  Switch,
  TextArea,
} from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import {
  add_display,
  cleanUp_display_redux,
  leave_hover_des,
  on_hover_des,
  remove_display,
} from "@/slices/resumeSlice";
import { RootState } from "@/store/store";

export default function Result_alt({
  id,
  whatToGet,
  customedCSS,
}: {
  id: string;
  whatToGet: string;
  customedCSS: string;
}) {
  const dispatch = useDispatch();

  const stage_3_ls: any = localStorage.getItem("stage_3");

  const display_redux = useSelector((state: RootState) => state.resume.display);
  const hover_des_redux = useSelector(
    (state: RootState) => state.resume.hover_des
  );

  const [get, setGet] = useState<any[]>([]);

  useEffect(() => {
    let temp_matches: string[] = [];
    let temp_unmatches: string[] = [];
    display_redux?.map((each: { match_sentence: string; count: number }) => {
      each.count > 0 &&
        temp_matches.includes(each.match_sentence) === false &&
        temp_matches.push(each.match_sentence);
      each.count === 0 &&
        temp_unmatches.includes(each.match_sentence) === false &&
        temp_unmatches.push(each.match_sentence);
    });
    if (whatToGet === "matches") {
      setGet(temp_matches);
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("matches", JSON.stringify(temp_matches));
      // }
    }
    if (whatToGet === "unmatches") {
      setGet(temp_unmatches);
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("unmatches", JSON.stringify(temp_unmatches));
      // }
    }
    return () => {
      temp_matches = [];
      temp_unmatches = [];
      setGet([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whatToGet, display_redux, stage_3_ls]);

  const ClickHandler = (deleteIndex: number) => {
    switch (whatToGet) {
      case "unmatches":
        dispatch(add_display({ sentence: get[deleteIndex], from: "matches" }));

        return;
      case "matches":
        dispatch(remove_display({ sentence: get[deleteIndex] }));

        return;
    }
  };

  return (
    <div
      className={`bg-white px-3 py-1 cursor-pointer top-0 z-10 rounded border-2
      ${whatToGet === "matches" ? " border-green-500 " : " "}
      ${whatToGet === "unmatches" ? " border-red-500 " : " "}
       grid grid-cols-2 gap-2
        ${customedCSS}`}
      id={id}
      content="hi"
    >
      {get?.map((each, i) => (
        <div key={i} className="flex justify-between mb-0">
          <div className="flex">
            <div> {i + 1}</div>&nbsp;
            <div
              onMouseDown={() => dispatch(on_hover_des(each))}
              className={` text-xs break-words ${
                hover_des_redux === each ? " font-bold" : ""
              }`}
            >
              {each}
            </div>
            <span className="ms-3 text-xs ">
              {hover_des_redux === each && (
                <div
                  className=" text-red-600 font-bold"
                  onMouseDown={() => dispatch(leave_hover_des())}
                >
                  hide
                </div>
              )}
            </span>
          </div>
          {/* <div
            className={`
            ${
              whatToGet === "unmatches"
                ? " hover:border-2 hover:border-red-400 "
                : " "
            }
            ${
              ""
              // whatToGet === "matches"
              // ? " hover:border-2 hover:border-green-400 "
              // : " "
            }

            `}
          >
            <Button
              icon={
                <Icon
                  icon="tick"
                  className=" transition duration-500 "
                  style={{ color: "white" }}
                  size={10}
                />
              }
              style={{ backgroundColor: "green" }}
              small
              onClick={() => ClickHandler(i)}
            />
          </div> */}
        </div>
      ))}
    </div>
  );
}
