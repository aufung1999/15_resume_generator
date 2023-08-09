import React from "react";

import resume_image from "../../public/resume_image.png";

import Image from "next/image";
import ShowMany from "@/utils/ShowMany";

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { Icon, IconSize } from "@blueprintjs/core";
import Intro_2_Resume_parts_resume from "./Intro_2_Resume_parts_resume";
import Intro_2_Resume_parts_main_parts from "./Intro_2_Resume_parts_main_parts";
import Intro_2_Resume_parts_what_else from "./Intro_2_Resume_parts_what_else";
import Intro_2_Resume_parts_process from "./Intro_2_Resume_parts_process";

export default function Intro_Resumes_parts() {
  return (
    <>
      <div className="border  bg-[#102C57]  px-32 py-10 mx-10 rounded-3xl">
        <div className="border text-lg text-white flex flex-row-reverse w-full">
          <div
            // responsive
            className=" text-white font-serif relative w-1/3"
          >
            <Image
              className=""
              src={resume_image}
              alt="resume_image"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                color: "white",
                filter:
                  "invert(100%) sepia(100%) saturate(10000%) hue-rotate(180deg)",
              }}
            />
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Intro_2_Resume_parts_resume />
            </div>
          </div>
          {/* // responsive */}
          <div className="text-xl text-white font-serif place-self-center w-2/3 px-3 tracking-wide">
            ResumeAi focuses on{" "}
            <span className="font-semibold underline italic">
              Technical Skills, Working Experience and Projects
            </span>
            , and helps you generate{" "}
            <span className="font-semibold underline italic">
              the most suitable
            </span>{" "}
            Resume for every companies, pass application stage and move to the
            phone call interview.
          </div>
        </div>
      </div>

      <div className="px-32 py-10 mx-10 border-0 border-[#102C57] rounded-3xl">
        <Intro_2_Resume_parts_main_parts />
      </div>

      <div className="px-32 py-10 mx-10 border-0 border-[#102C57] rounded-3xl">
        <Intro_2_Resume_parts_what_else />
      </div>

      <div className="px-32 py-10 bg-[#102C57]">
        <Intro_2_Resume_parts_process />
      </div>
    </>
  );
}
