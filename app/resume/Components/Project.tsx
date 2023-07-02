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
          item.display_in_Resume && (
            <div key={i} className="py-1">
              <div className="flex justify-between items-center">
                <SectionTitle label={item.ProjectName} />
                <SectionSubtitle label={item.Techniques} />
              </div>

              {item?.ProjectDescription.map((each: any, ind: number) => (
                <SectionList key={ind}>
                  <li>{each?.Row}</li>
                </SectionList>
              ))}
            </div>
          )
        );
      })}
    </div>
  );
}
