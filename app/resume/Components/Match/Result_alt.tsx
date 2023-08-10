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
  FORCE_to_UPDATE,
  add_display,
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

  const display_redux = useSelector((state: RootState) => state.resume.display);

  const [get, setGet] = useState<any[]>([]);

  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   if (localStorage.getItem(whatToGet)) {
    //     const newObject: any = window.localStorage.getItem(whatToGet);
    //     setGet(JSON.parse(newObject));
    //   }
    // }
    let temp_matches: string[] = [];
    let temp_unmatches: string[] = [];
    console.log(display_redux);
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
    }
    if (whatToGet === "unmatches") {
      setGet(temp_unmatches);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display_redux]);

  const ClickHandler = (deleteIndex: number) => {
    dispatch(FORCE_to_UPDATE(JSON.stringify(Date())));
    switch (whatToGet) {
      case "unmatches":
        dispatch(add_display({ sentence: get[deleteIndex], from: "matches" }));

        //   const filtered_unmatches = get.filter(
        //     (each) => each !== move_to_matches
        //   );

        //   //update localStorage "unmatches"
        //   localStorage.setItem("unmatches", JSON.stringify(filtered_unmatches));
        //   //update localStorage "matches"
        //   const matches_ls: any = window.localStorage.getItem("matches");
        //   const new_matches: any[] = [...JSON.parse(matches_ls), move_to_matches];
        //   localStorage.setItem("matches", JSON.stringify(new_matches));
        return;
      case "matches":
        dispatch(remove_display({ sentence: get[deleteIndex] }));
        //   const filtered_matches = get.filter(
        //     (each) => each !== move_to_unmatches
        //   );
        //   //update localStorage "matches"
        //   localStorage.setItem("matches", JSON.stringify(filtered_matches));
        //   //update localStorage "matches"
        //   const unmatches_ls: any = window.localStorage.getItem("unmatches");
        //   const new_unmatches: any[] = [
        //     ...JSON.parse(unmatches_ls),
        //     move_to_unmatches,
        //   ];
        //   localStorage.setItem("unmatches", JSON.stringify(new_unmatches));
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
        <div key={i} className="flex justify-between mb-2">
          <div className="flex">
            <div> {i + 1}</div>&nbsp;
            <div className=" text-xs break-words">{each}</div>
          </div>
          <div
            className={`
            ${
              whatToGet === "unmatches"
                ? " hover:border-2 hover:border-green-400 "
                : " "
            }
            ${
              whatToGet === "matches"
                ? " hover:border-2 hover:border-green-400 "
                : " "
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
          </div>
        </div>
      ))}
    </div>
  );
}
