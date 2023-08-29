"use client";
import { RootState } from "@/store/store";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Contact from "./Sections/Contact";
import { WorkSection } from "./Sections/Work";
import EducationSection from "./Sections/Education";
import SkillSection from "./Sections/Skill";
import ProjectSection from "./Sections/Project";
import ObjectiveSection from "./Sections/Objective";
import { forwardRef } from "react";
import DisplaySkill from "./Match/Skill";

import { useSearchParams } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Resume = forwardRef((props, ref: any) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const job_details_ls = localStorage.getItem("job_details");

  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);
  const skill_redux = useSelector((state: RootState) => state.skills);
  const project_redux = useSelector((state: RootState) => state.projects);
  const objective_redux = useSelector((state: RootState) => state.objectives);

  // Initialize the Resume Template
  // let componentsArray = [
  //   {
  //     id: "resume-contact",
  //     component:
  //       <Contact
  //         key="contact"
  //         FirstName={contact_redux.FirstName}
  //         LastName={contact_redux.LastName}
  //         PhoneNumber={contact_redux.PhoneNumber}
  //         Country={contact_redux.Country}
  //         City={contact_redux.City}
  //         State={contact_redux.State}
  //         ZipCode={contact_redux.ZipCode}
  //         Email={contact_redux.Email}
  //         Portfolio={contact_redux.Portfolio}
  //         LinkedIn={contact_redux.LinkedIn}
  //         GitHub={contact_redux.GitHub}
  //       />

  //   },

  //   {
  //     id: "resume-objective",
  //     component:
  //       <ObjectiveSection key="objective" objective={objective_redux} />

  //   },
  //   {
  //     id: "resume-education",
  //     component:
  //       <EducationSection key="education" education={education_redux} />

  //   },
  //   {
  //     id: "resume-skill",
  //     component: <SkillSection key="skill" skill={skill_redux} />,
  //   },
  //   {
  //     id: "resume-work",
  //     component: <WorkSection key="work" experience={work_redux} />,
  //   },
  //   {
  //     id: "resume-project",
  //     component: <ProjectSection key="project" project={project_redux} />,
  //   },
  // ];
  const componentsArray = [
    <Contact
      key="contact"
      FirstName={contact_redux.FirstName}
      LastName={contact_redux.LastName}
      PhoneNumber={contact_redux.PhoneNumber}
      Country={contact_redux.Country}
      City={contact_redux.City}
      State={contact_redux.State}
      ZipCode={contact_redux.ZipCode}
      Email={contact_redux.Email}
      Portfolio={contact_redux.Portfolio}
      LinkedIn={contact_redux.LinkedIn}
      GitHub={contact_redux.GitHub}
      OpentoWork={contact_redux.OpentoWork}
      Sponsorship={contact_redux.Sponsorship}
    />,

    <ObjectiveSection key="objective" objective={objective_redux} />,

    <EducationSection key="education" education={education_redux} />,

    <SkillSection key="skill" skill={skill_redux} />,

    <WorkSection key="work" experience={work_redux} />,

    <ProjectSection key="project" project={project_redux} />,
  ];

  //handleOnDragEnd
  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    // console.log(result);

    const [reorderedItem] = componentsArray.splice(result.source.index, 1);
    componentsArray.splice(result.destination.index, 0, reorderedItem);
  }

  return (
    <div
      className=" w-a4 border-2  px-6 py-2 bg-white text-black relative"
      ref={ref}
      key={search}
    >
      {/* //rename the print Default Name */}
   

      <div className=" absolute top-0 right-0 z-20 text-xs">
        <span className=" font-bold">*{contact_redux.OpentoWork}</span>
        <span> </span>
        <span className=" font-bold">*{contact_redux.Sponsorship}</span>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="resume">
          {(provided: any) => (
            <div
              key="resume"
              className={"flex-col h-full resume"}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {componentsArray?.map((each: any, i: number) => (
                <Draggable
                  // {/* Drag and Drop */}
                  key={i}
                  draggableId={`draggable-${i}`}
                  index={i}
                >
                  {(provided) => (
                    <div
                      // className={item.display_in_Resume ? "" : "hidden"}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {each}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
  // return (
  //   <div
  //     className=" w-a4 border-2  px-6 py-2 bg-white text-black "
  //     ref={ref}
  //     key={search}
  //   >
  //     {/* //rename the print Default Name */}
  //     <title>Hello</title>
  //     <div className={"flex-col h-full "}>
  //       <Contact
  //         FirstName={contact_redux.FirstName}
  //         LastName={contact_redux.LastName}
  //         PhoneNumber={contact_redux.PhoneNumber}
  //         Country={contact_redux.Country}
  //         City={contact_redux.City}
  //         State={contact_redux.State}
  //         ZipCode={contact_redux.ZipCode}
  //         Email={contact_redux.Email}
  //         Portfolio={contact_redux.Portfolio}
  //         LinkedIn={contact_redux.LinkedIn}
  //         GitHub={contact_redux.GitHub}
  //       />

  //       <ObjectiveSection objective={objective_redux} />

  //       <EducationSection education={education_redux} />

  //       <SkillSection key={search} skill={skill_redux} />

  //       <WorkSection experience={work_redux} />

  //       <ProjectSection project={project_redux} />
  //     </div>
  //   </div>
  // );
});

Resume.displayName = "Resume";
export default Resume;
