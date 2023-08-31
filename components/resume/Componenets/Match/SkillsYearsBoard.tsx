import { SkillsState, addYears, subtractYears } from "@/slices/skillsSlice";
import { RootState } from "@/store/store";
import { Button } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css"; // Import Blueprint CSS

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
      className={` bg-white border-2 border-blue-500
    ${customedCSS}`}
    >
      {skills_redux?.map((each: SkillsState, i: number) => (
        <div className="flex flex-col" key={i}>
          {each?.term} (years)
          <div className="grid grid-cols-5 gap-x-2">
            {each?.Skill_list.map((skill: any, ind: number) => (
              <div className="flex justify-between border " key={ind}>
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
                <div className="grid grid-cols-10 border flex-1">
                  <div className=" col-span-8 content-center">
                    {skill.skill}
                  </div>
                  <div className=" col-span-2">{skill.years}</div>
                </div>
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
                  -
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
