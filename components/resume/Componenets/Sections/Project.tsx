import { ProjectState, drag_drop } from "@/slices/projectsSlice";
import React from "react";
import { SectionHeading } from "../../atoms/SectionHeading";
import { SectionList } from "../../atoms/SectionList";
import { SectionSubtitle } from "../../atoms/SectionSubtitle";
import { SectionTitle } from "../../atoms/SectionTitle";
import CustomedTooltip from "../Match/Tooltip";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";

//Css style
import "./Project.css";

export default function ProjectSection({ project }: ProjectState[] | any) {
  const dispatch = useDispatch();

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    dispatch(drag_drop({ result: result }));
  }
  return (
    <div className="mb-1">
      <SectionHeading title="Project" />
      {/* Drag and Drop */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* Drag and Drop */}
        <Droppable droppableId="projects">
          {/* Drag and Drop */}
          {(provided: any) => (
            <div
              className="projects"
              // {/* Drag and Drop */}
              {...provided.droppableProps}
              // {/* Drag and Drop */}
              ref={provided.innerRef}
            >
              {project.map((item: ProjectState, i: number) => {
                return (
                  <Draggable
                    // {/* Drag and Drop */}
                    key={item.index}
                    draggableId={item.index}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        key={i}
                        className={`mb-1 ${
                          item.display_in_Resume ? "" : "hidden"
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className=" flex justify-between">
                          <div className="flex flex-row gap-1">
                            {/* 1. Project Name */}
                            <SectionTitle label={item.ProjectName} />
                            {/* 2. Link */}
                            {item.Link && (
                              <div className=" flex flex-start">
                                <a href={item.Link} className="">
                                  <LaunchIcon style={{ fontSize: 12 }} />
                                </a>
                              </div>
                            )}
                            {/* 3. Github Link */}
                            {item.GithubLink && (
                              <div className=" flex flex-start">
                                <a href={item.GithubLink}>
                                  <GitHubIcon style={{ fontSize: 12 }} />
                                </a>
                              </div>
                            )}
                          </div>

                          <CustomedTooltip
                            index_1st={item.index}
                            index_2nd={null}
                            text={
                              <div className=" text-[12px]">
                                {item.Techniques}
                              </div>
                            }
                            description={item.Techniques}
                            whichSection="project"
                          />
                        </div>
                        <div className="px-3">
                          {item?.ProjectDescription?.map(
                            (each: any, ind: number) => (
                              <SectionList key={ind}>
                                <CustomedTooltip
                                  index_1st={item.index}
                                  index_2nd={each.rowIndex}
                                  description={each?.Row}
                                  text={
                                    <span className=" inline-flex">
                                      <li />
                                      <div
                                        className=" flex leading-1 myClass"
                                        dangerouslySetInnerHTML={{
                                          __html: each?.HTML,
                                        }}
                                      />
                                    </span>
                                  }
                                  whichSection="project"
                                />
                              </SectionList>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
