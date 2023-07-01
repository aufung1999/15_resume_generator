import { SkillsState } from "@/slices/skillsSlice";
import React from "react";
import { SectionHeading } from "../atoms/SectionHeading";
import { SectionList } from "../atoms/SectionList";
import { SectionSubtitle } from "../atoms/SectionSubtitle";
import { SectionTitle } from "../atoms/SectionTitle";

export default function SkillSection({ skill }: SkillsState[] | any) {
  return (
    <div className="my-3">
      {skill?.map((item: SkillsState, i: number) => (
        <div key={i}>
          <SectionHeading title={item.term} />
          <div className="flex items-center flex-wrap gap-2.5 py-2">
            {item.Skill_list.map((each: any, ind: number) => (
              <div
                key={ind}
                className="py-1 px-2 text-sm font-medium border-b-2 border-color-[##a9a9a9]"
              >
                {each.skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
