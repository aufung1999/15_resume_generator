"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";

import ContactClient from "../contact/ContactClient";
import EducationClient from "../education/Client";
import ObjectiveClient from "../objective/Client";
import ProjectClient from "../projects/Client";
import SkillClient from "../skills/Client";
import WorkClient from "../work/Client";

import { RootState } from "@/store/store";
import {
  Icon,
  Classes,
  Button,
  Overlay,
  Navbar,
  Alignment,
  NavbarGroup,
} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "tailwindcss/tailwind.css";

import { useSelector, useDispatch } from "react-redux";

import { useSearchParams } from "next/navigation";
import Resumes from "./Resumes";
import { switch_Components } from "@/slices/controlSlice";

import TrackVisibility from "react-on-screen";
import TrackedComponent from "./TrackedComponent";

export default function UserClient({ data }: any) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const dispatch = useDispatch();

  const switch_tab = useSelector((state: RootState) => state.control.switch);

  // console.log(data);

  //-------------------------------------------------
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  //----------------Side Bar---------------------------------
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  //-----------Get the user info. from redux-----------------
  const Viewport_redux = useSelector(
    (state: RootState) => state.control.Viewport
  );

  const contact_redux = useSelector((state: RootState) => state.contact);
  const work_redux = useSelector((state: RootState) => state.work);
  const education_redux = useSelector((state: RootState) => state.education);
  const skills_redux = useSelector((state: RootState) => state.skills);
  const objectives_redux = useSelector((state: RootState) => state.objectives);
  const projects_redux = useSelector((state: RootState) => state.projects);

  return (
    <div className=" w-full relative " key={search}>
      <div className="flex gap-3 justify-center py-3">
        <Button
          className=" "
          onClick={() => dispatch(switch_Components({ select: "Resumes" }))}
        >
          Resumes
        </Button>
        <Button
          className=" "
          onClick={() => dispatch(switch_Components({ select: "User_Info" }))}
        >
          Edit
        </Button>
      </div>

      {/* The Fixed component */}
      {/* {switch_tab === "User_Info" && (
        <div className="fixed z-30 bottom-10 left-1/2 transform -translate-x-1/2 ">
          <div className="bg-[#102C57] rounded-full px-3 py-1">
            <Button
              className=" focus:opacity-100 opacity-50 rounded-l-full"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </Button>

            <Button
              className=" focus:opacity-100 opacity-50"
              onClick={() => scrollToSection("objective")}
            >
              Objective
            </Button>

            <Button
              className=" focus:opacity-100 opacity-50"
              onClick={() => scrollToSection("skill")}
            >
              Skill
            </Button>

            <Button
              className=" focus:opacity-100 opacity-50"
              onClick={() => scrollToSection("education")}
            >
              Education
            </Button>

            <Button
              className=" focus:opacity-100 opacity-50"
              onClick={() => scrollToSection("work")}
            >
              Work
            </Button>

            <Button
              className=" focus:opacity-100 opacity-50 rounded-r-full"
              onClick={() => scrollToSection("project")}
            >
              Project
            </Button>
          </div>
        </div>
      )} */}

      {/* rendered page */}
      <div className="w-full relative">
        <div className={switch_tab === "Resumes" ? " w-full" : "  hidden "}>
          <Resumes resumeData={data.resumeData} />
        </div>

        {switch_tab === "User_Info" && (
          <div className=" w-full flex h-screen ">
            {/* 1. the left side menu  */}
            <div
              className={`${
                sidebarOpen ? " w-1/6 " : " w-16 "
              } bg-[#102C57] text-white transition-all duration-300 flex flex-col h-full`}
            >
              <div className="p-4">
                <Button
                  onClick={toggleSidebar}
                  className="w-8 h-8 p-0 m-0 mb-4 text-white hover:text-yellow-300"
                  minimal
                >
                  <Icon icon={sidebarOpen ? "chevron-left" : "chevron-right"} />
                </Button>
              </div>

              <div className=" border-4 flex-1">
                {sidebarOpen && (
                  <div className=" flex flex-col w-auto justify-evenly h-full">
                    {/* Contact Section */}
                    <div className=" w-full ">
                      <Button
                        className={`focus:opacity-100 opacity-50 w-full ${
                          Viewport_redux === "contact" ? "opacity-100" : ""
                        }`}
                        onClick={() => scrollToSection("contact")}
                      >
                        Contact
                      </Button>

                      <div className="transition-opacity duration-500 opacity-100 hover:opacity-50">
                        {Viewport_redux === "contact" && (
                          <div className="w-full grid grid-cols-10  ">
                            {/* 1. first name */}
                            <div className=" col-span-1" />
                            <li className=" col-span-1" />
                            <div className=" col-span-6">First Name</div>
                            <div className=" col-span-1">
                              {contact_redux.FirstName !== "" ? (
                                <span>✔️</span>
                              ) : (
                                <span>❔</span>
                              )}
                            </div>
                            <div className=" col-span-1" />

                            {/* 2. last name */}
                            <div className=" col-span-1" />
                            <li className=" col-span-1" />
                            <div className=" col-span-6">Last Name</div>
                            <div className=" col-span-1">
                              {contact_redux.LastName !== "" ? (
                                <span>✔️</span>
                              ) : (
                                <span>❔</span>
                              )}
                            </div>
                            <div className=" col-span-1" />

                            {/* 3. Phone name */}
                            <div className=" col-span-1" />
                            <li className=" col-span-1" />
                            <div className=" col-span-6">Phone</div>
                            <div className=" col-span-1">
                              {contact_redux.PhoneNumber !== "" ? (
                                <span>✔️</span>
                              ) : (
                                <span>❔</span>
                              )}
                            </div>
                            <div className=" col-span-1" />

                            {/* 4. Email*/}
                            <div className=" col-span-1" />
                            <li className=" col-span-1" />
                            <div className=" col-span-6">Email</div>
                            <div className=" col-span-1">
                              {contact_redux.Email !== "" ? (
                                <span>✔️</span>
                              ) : (
                                <span>❔</span>
                              )}
                            </div>
                            <div className=" col-span-1" />

                            {/* 5. Portfolio*/}
                            <div className=" col-span-1" />
                            <li className=" col-span-1" />
                            <div className=" col-span-6">Portfolio</div>
                            <div className=" col-span-1">
                              {contact_redux.Portfolio !== "" ? (
                                <span>✔️</span>
                              ) : (
                                <span>❔</span>
                              )}
                            </div>
                            <div className=" col-span-1" />

                            {/* 6. LinkedIn*/}
                            <div className=" col-span-1" />
                            <li className=" col-span-1" />
                            <div className=" col-span-6">LinkedIn</div>
                            <div className=" col-span-1">
                              {contact_redux.LinkedIn !== "" ? (
                                <span>✔️</span>
                              ) : (
                                <span>❔</span>
                              )}
                            </div>
                            <div className=" col-span-1" />

                            {/* 7. LinkedIn*/}
                            <div className=" col-span-1" />
                            <li className=" col-span-1" />
                            <div className=" col-span-6">Github</div>
                            <div className=" col-span-1">
                              {contact_redux.GitHub !== "" ? (
                                <span>✔️</span>
                              ) : (
                                <span>❔</span>
                              )}
                            </div>
                            <div className=" col-span-1" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Objective Section */}
                    <div className=" w-full ">
                      <Button
                        className={`focus:opacity-100 opacity-50 w-full ${
                          Viewport_redux === "objective" ? "opacity-100" : ""
                        }`}
                        onClick={() => scrollToSection("objective")}
                      >
                        Objective
                      </Button>

                      {Viewport_redux === "objective" && (
                        <div className="w-full grid grid-cols-10 ">
                          <div className=" col-span-1" />
                          <li className=" col-span-1" />
                          <div className=" col-span-6">
                            {" "}
                            {objectives_redux.length} Objectives
                          </div>
                          <div className=" col-span-1" />
                          <div className=" col-span-1" />
                        </div>
                      )}
                    </div>

                    {/* Skill Section */}
                    <div className=" w-full ">
                      <Button
                        className={`focus:opacity-100 opacity-50 w-full ${
                          Viewport_redux === "skill" ? "opacity-100" : ""
                        }`}
                        onClick={() => scrollToSection("skill")}
                      >
                        Skill
                      </Button>

                      {Viewport_redux === "skill" && (
                        <div className="w-full grid grid-cols-10 ">
                          <div className=" col-span-1" />
                          <li className=" col-span-1" />
                          <div className=" col-span-6">
                            <div>{skills_redux.length} Skills</div>
                          </div>
                          <div className=" col-span-1" />
                          <div className=" col-span-1" />
                        </div>
                      )}
                    </div>

                    {/* Education Section */}
                    <div className=" w-full ">
                      <Button
                        className={`focus:opacity-100 opacity-50 w-full ${
                          Viewport_redux === "education" ? "opacity-100" : ""
                        }`}
                        onClick={() => scrollToSection("education")}
                      >
                        Education
                      </Button>

                      {Viewport_redux === "education" && (
                        <div className="w-full grid grid-cols-10 ">
                          <div className=" col-span-1" />
                          <li className=" col-span-1" />
                          <div className=" col-span-6">
                            <div>{education_redux.length} Educations</div>
                          </div>
                          <div className=" col-span-1" />
                          <div className=" col-span-1" />
                        </div>
                      )}
                    </div>

                    {/* Work Section */}
                    <div className=" w-full ">
                      <Button
                        className={`focus:opacity-100 opacity-50 w-full ${
                          Viewport_redux === "work" ? "opacity-100" : ""
                        }`}
                        onClick={() => scrollToSection("work")}
                      >
                        Work
                      </Button>

                      {Viewport_redux === "work" && (
                        <div className="w-full grid grid-cols-10 ">
                          <div className=" col-span-1" />
                          <li className=" col-span-1" />
                          <div className=" col-span-6">
                            <div>{work_redux.length} Works</div>
                          </div>
                          <div className=" col-span-1" />
                          <div className=" col-span-1" />
                        </div>
                      )}
                    </div>

                    {/* Project Section */}
                    <div className=" w-full ">
                      <Button
                        className={`focus:opacity-100 opacity-50 w-full ${
                          Viewport_redux === "project" ? "opacity-100" : ""
                        }`}
                        onClick={() => scrollToSection("project")}
                      >
                        Project
                      </Button>

                      {Viewport_redux === "project" && (
                        <div className="w-full grid grid-cols-10 ">
                          <div className=" col-span-1" />
                          <li className=" col-span-1" />
                          <div className=" col-span-6">
                            <div>{projects_redux.length} Projects</div>
                          </div>
                          <div className=" col-span-1" />
                          <div className=" col-span-1" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. the right side menu */}
            <div className=" overflow-y-auto no-scrollbar flex-1">
              <TrackedComponent id="contact">
                <div id="contact">
                  <div
                    className={`text-lg font-semibold border flex justify-center bg-[#102C57] text-white py-2 `}
                  >
                    Contact
                  </div>
                  <ContactClient data={data.contact} />
                </div>
              </TrackedComponent>

              <TrackedComponent id="objective">
                <div id="objective">
                  <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                    Objectives
                  </div>
                  <ObjectiveClient data={data.objective} />
                </div>
              </TrackedComponent>

              <TrackedComponent id="skill">
                <div id="skill">
                  <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                    Technical Skills
                  </div>
                  <SkillClient data={data.skill} />
                </div>
              </TrackedComponent>

              <TrackedComponent id="education">
                <div id="education">
                  <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                    Education
                  </div>
                  <EducationClient data={data.education} />
                </div>
              </TrackedComponent>

              <TrackedComponent id="work">
                <div id="work">
                  <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                    Working Experience
                  </div>
                  <WorkClient data={data.work} />
                </div>
              </TrackedComponent>

              <TrackedComponent id="project">
                <div id="project">
                  <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                    Projects
                  </div>
                  <ProjectClient data={data.project} />
                </div>
              </TrackedComponent>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
