import { SkillsState, addYears, subtractYears } from "@/slices/skillsSlice";
import { RootState } from "@/store/store";
import { Button } from "@blueprintjs/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function SkillsYearsBoard({
  customedCSS,
}: {
  customedCSS: any;
}) {
  const dispatch = useDispatch();
  const skills_redux = useSelector((state: RootState) => state.skills);

  return (
    <div
      className={` bg-white grid grid-cols-5
    ${customedCSS}`}
    >
      {skills_redux?.map((each: SkillsState) =>
        each?.Skill_list.map((skill: any, i: number) => (
          <div className="flex justify-center" key={i}>
            <Button
              onClick={() =>
                dispatch(
                  addYears({
                    index: each.index,
                    skillIndex: skill.skillIndex,
                    years: Number(skill.years) + 1,
                  })
                )
              }
            >
              +
            </Button>
            {skill.skill}
            {skill.years}
            <Button
              onClick={() =>
                dispatch(
                  subtractYears({
                    index: each.index,
                    skillIndex: skill.skillIndex,
                    years: Number(skill.years) - 1,
                  })
                )
              }
            >
              +
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
