import { EducationState } from "@/slices/educationSlice";
import React from "react";
import { SectionHeading } from "../atoms/SectionHeading";
import { SectionList } from "../atoms/SectionList";
import { SectionSubtitle } from "../atoms/SectionSubtitle";
import { SectionTitle } from "../atoms/SectionTitle";
import { timeConverter } from "../Functions/timeConvertor";

export default function EducationSection({
  education,
}: EducationState[] | any) {
  return (
    <div className="mb-2">
      <SectionHeading title="Education" />

      {education.map((item: EducationState, index: number) => {
        return (
          <div key={index} className="py-2">
            <div>
              <u>
                  <SectionTitle label={item.SchoolName} />

              </u>
              <div className="flex justify-between items-center">
                <SectionSubtitle label={`${item.Subject}`} />
                <div className="flex gap-3">
                  <p className="text-sm">
                    {timeConverter(Date.parse(item.StartDate))} -
                    {item.current
                      ? "present"
                      : timeConverter(Date.parse(item.EndDate))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
