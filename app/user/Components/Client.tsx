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
import { editOnScreen, switch_Components } from "@/slices/controlSlice";

import TrackVisibility from "react-on-screen";

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

  //---------On/ Off Screen

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
                    <Button
                      className=" focus:opacity-100 opacity-50 "
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
                      className=" focus:opacity-100 opacity-50 "
                      onClick={() => scrollToSection("project")}
                    >
                      Project
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* 2. the right side menu */}
            <div className=" overflow-y-auto no-scrollbar flex-1">
              <div id="contact">
                <div
                  className={`text-lg font-semibold border flex justify-center bg-[#102C57] text-white py-2 `}
                >
                  Contact
                </div>
                <ContactClient data={data.contact} />
              </div>

              <div id="objective">
                <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                  Objectives
                </div>
                <ObjectiveClient data={data.objective} />
              </div>

              <div id="skill">
                <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                  Technical Skills
                </div>
                <SkillClient data={data.skill} />
              </div>

              <div id="education">
                <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                  Education
                </div>
                <EducationClient data={data.education} />
              </div>

              <div id="work">
                <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                  Working Experience
                </div>
                <WorkClient data={data.work} />
              </div>

              <div id="project">
                <div className=" text-lg font-semibold flex justify-center bg-[#102C57] text-white py-2">
                  Projects
                </div>
                <ProjectClient data={data.project} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
