import { ObjectiveState } from "@/slices/objectiveSlice";
import React from "react";
import { SectionHeading } from "../atoms/SectionHeading";
import { SectionList } from "../atoms/SectionList";
import { SectionSubtitle } from "../atoms/SectionSubtitle";
import { SectionTitle } from "../atoms/SectionTitle";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
export default function ObjectiveSection({
  objective,
}: ObjectiveState[] | any) {
  const objectives: ObjectiveState[] = useSelector(
    (state: RootState) => state.objectives
  );
  //This is to find if there is any "true" display_in_Resume of every items in "Objective" redux store
  const display = objectives.some((each) => each.display_in_Resume === true);
  return (
    <>
      {display && (
        <div className="mb-3">
          <SectionHeading title="Objective" />
          {objective.map((item: ObjectiveState, i: number) => {
            return (
              <>
                {item.display_in_Resume && (
                  <div key={i} className="py-2">
                    <div className="flex justify-between items-center">
                      <SectionSubtitle label={item.ObjectiveDes} />
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
