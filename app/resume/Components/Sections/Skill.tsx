import { SkillsState } from "@/slices/skillsSlice";
import React from "react";
import { SectionHeading } from "../../atoms/SectionHeading";
import { SectionList } from "../../atoms/SectionList";
import { SectionSubtitle } from "../../atoms/SectionSubtitle";
import { SectionTitle } from "../../atoms/SectionTitle";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import CustomedTooltip from "../Match/Tooltip";

export default function SkillSection({ skill }: SkillsState[] | any) {
  return (
    <div className="mb-2">
      <SectionHeading title="Technical Skills" />
      <div className="grid grid-cols-4">
        {skill?.map((item: SkillsState, i: number) => (
          <div key={i} className="border-2">
            <SectionTitle label={item.term} />
            <div className="flex items-center flex-wrap gap-1 ">
              {item.Skill_list.map((each: any, ind: number) => (
                <div
                  key={ind}
                  className="relative px-1 text-xs font-medium border-b-2 border-color-[##a9a9a9]"
                >
                  <CustomedTooltip index_1st={item.index} index_2nd={each.skillIndex} text={each.skill} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
