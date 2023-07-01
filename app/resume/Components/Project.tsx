import { ProjectState } from "@/slices/projectsSlice";
import React from "react";
import { SectionHeading } from "../atoms/SectionHeading";
import { SectionList } from "../atoms/SectionList";
import { SectionSubtitle } from "../atoms/SectionSubtitle";
import { SectionTitle } from "../atoms/SectionTitle";

export default function ProjectSection({ project }: ProjectState[] | any) {
  return (
    <div className="mb-3">
      <SectionHeading title="Project" />

      {project.map((item: ProjectState, i: number) => {
        return (
          <div key={i} className="py-2">
            <SectionTitle label={item.ProjectName} />
            <div className="flex justify-between items-center">
              <SectionSubtitle label={item.Techniques} />
            </div>

            {item?.ProjectDescription.map((each: any, ind: number) => (
              <SectionList key={ind}>
                <div>{each?.Row}</div>
              </SectionList>
            ))}
          </div>
        );
      })}
    </div>
  );
}
