import { RootState } from "@/store/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function DisplaySkill() {
  const match_skill = useSelector(
    (state: RootState) => state.resume.match_skill
  );
  return match_skill.map((each: any, i:number) => (
    <div key={i}>
      <div>{JSON.stringify(each?.technique)}</div>
      <div>{JSON.stringify(each?.match_sentence)}</div>
    </div>
  ));
}
