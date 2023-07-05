import { ProjectState, drag_drop } from "@/slices/projectsSlice";
import React from "react";
import { SectionHeading } from "../../atoms/SectionHeading";
import { SectionList } from "../../atoms/SectionList";
import { SectionSubtitle } from "../../atoms/SectionSubtitle";
import { SectionTitle } from "../../atoms/SectionTitle";
import CustomedTooltip from "../Match/Tooltip";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

export default function ProjectSection({ project }: ProjectState[] | any) {
  const dispatch = useDispatch();

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    dispatch(drag_drop({ result: result }));
  }
  return (
    <div className="mb-2">
      <SectionHeading title="Project" />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="projects">
          {(provided: any) => (
            <div
              className="projects"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {project.map((item: ProjectState, i: number) => {
                return (
                  <Draggable
                    key={item.index}
                    draggableId={item.index}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        key={i}
                        className={item.display_in_Resume ? "" : "hidden"}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex justify-between items-center">
                          <SectionTitle label={item.ProjectName} />
                          <CustomedTooltip
                            index_1st={item.index}
                            index_2nd={null}
                            text={item.Techniques}
                          />
                        </div>
                        <div className="px-3">
                          {item?.ProjectDescription.map(
                            (each: any, ind: number) => (
                              <SectionList key={ind}>
                                <span className="flex leading-none">
                                  <li />
                                  <div
                                    className=" flex leading-none"
                                    dangerouslySetInnerHTML={{
                                      __html: each?.Row,
                                    }}
                                  />
                                </span>
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
