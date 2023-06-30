import { EducationState } from "@/slices/educationSlice";
import React from "react";
import { SectionHeading } from "../atoms/SectionHeading";
import { SectionList } from "../atoms/SectionList";
import { SectionSubtitle } from "../atoms/SectionSubtitle";
import { SectionTitle } from "../atoms/SectionTitle";

export default function EducationSection({
  education,
}: EducationState[] | any) {
  return (
    <div className="mb-3">
      <SectionHeading title="Education" />

      {education.map((item: EducationState, index: number) => {
        return (
          <div key={index} className="py-2">
            <div>
              <SectionTitle label={`${item.Subject} - ${item.Degree}`} />
              <div className="flex justify-between items-center">
                <SectionSubtitle label={item.SchoolName} />
                <div className="flex gap-3">
                  <p className="text-xs">
                    {item.StartDate} -{item.current ? "present" : item.EndDate}
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
