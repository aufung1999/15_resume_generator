import { SkillsState } from "@/slices/skillsSlice";
import React from "react";
import { SectionHeading } from "../../atoms/SectionHeading";
import { SectionList } from "../../atoms/SectionList";
import { SectionSubtitle } from "../../atoms/SectionSubtitle";
import { SectionTitle } from "../../atoms/SectionTitle";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

import { useSearchParams } from "next/navigation";
import CustomedTooltip from "../Match/Tooltip";

export default function SkillSection({ skill }: SkillsState[] | any) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const years_in_skill_show_redux = useSelector((state: RootState) =>
    state.resume.years_in_skill_show?.map(
      (each: { isSwitch: boolean; description: string }) => each.isSwitch
    )
  );

  const show_In_resume = years_in_skill_show_redux.some(
    (each: boolean) => each === true
  );

  return (
    <div className="mb-2 w-full flex flex-col relative" key={search}>
      <SectionHeading
        title="Technical Skills"
        subtite={show_In_resume ? "(years+)" : ""}
      />
      <div className="flex flex-col w-full ">
        {skill?.map((item: SkillsState, i: number) => (
          <div key={i} className="">
            <div className="flex items-center flex-wrap gap-1 ">
              <SectionTitle label={item.term} />:
              {item.Skill_list.map((each: any, ind: number) => (
                <div key={ind} className="relative px-1 text-xs font-medium ">
                  <CustomedTooltip
                    key={search}
                    index_1st={item.index}
                    index_2nd={each.skillIndex}
                    description={each.skill}
                    text={each.skill}
                    whichSection="skill"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
