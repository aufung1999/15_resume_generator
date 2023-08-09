import React from "react";
import Technical_Skills from "../../public/Technical_Skills.png";
import Example_Work_Exp_1 from "../../public/Example_Work_Exp_1.png";
import Example_Work_Exp_2 from "../../public/Example_Work_Exp_2.png";
import Example_Projects from "../../public/Example_Projects.png";
import Example_Process from "../../public/Example_Process.png";

import resume_image from "../../public/resume_image.png";

import Image from "next/image";
import ShowMany from "@/utils/ShowMany";

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { Icon, IconSize } from "@blueprintjs/core";
import Intro_2_Resume_parts_resume from "./Intro_2_Resume_parts_resume";

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
      <div className="px-48 py-10">
        <div className="border grid grid-cols-10">
          <div className="border col-span-10 text-lg">
            <div>Technical Skills</div>
          </div>
          <div className="border col-span-10 text-lg">
            <div>
              ResumeAi re-orders the Skills according to the Job Description
            </div>
          </div>
          <div className="border col-span-10 text-lg">
            <div className="  w-full aspect-video  right-8 z-20">
              <Image
                src={Technical_Skills}
                alt="Technical_Skills"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                // width={500}
                // width={500} automatically provided
                // height={500} automatically provided
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
              />
            </div>
          </div>
        </div>

        <div className="border grid grid-cols-10">
          <div className="border col-span-10 text-lg">
            <div>Working Experience</div>
          </div>
          <div className="border col-span-10 text-lg">
            <div>
              ResumeAi checks if the Working Experience matches with the Job
              Description
            </div>
          </div>
          <div className="border col-span-5 text-lg">
            <div>Example 1</div>
            <div className="  w-full aspect-video  right-8 z-20">
              <Image
                src={Example_Work_Exp_1}
                alt="Example_Work_Exp_1"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="border col-span-5 text-lg">
            <div>Example 2</div>
            <div className="  w-full aspect-video  right-8 z-20">
              <Image
                src={Example_Work_Exp_2}
                alt="Example_Work_Exp_2"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>

        <div className="border grid grid-cols-10">
          <div className="border col-span-10 text-lg">
            <div>Personal/Collaberative Projects</div>
          </div>
          <div className="border col-span-10 text-lg">
            <div>
              ResumeAi firstly selects the Projects match with the Job
              Description
            </div>
          </div>
          <div className="border col-span-10 text-lg">
            <div className="  w-full aspect-video  right-8 z-20">
              <Image
                src={Example_Projects}
                alt="Example_Projects"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                // width={500}
                // width={500} automatically provided
                // height={500} automatically provided
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
              />
            </div>
          </div>
        </div>

        <div className="border grid grid-cols-10">
          <div className="border col-span-10 text-lg">
            <div>Personal/Collaberative Projects</div>
          </div>
          <div className="border col-span-10 text-lg">
            <div>
              ResumeAi firstly selects the Projects match with the Job
              Description
            </div>
          </div>
          <div className="border col-span-10 text-lg">
            <div className="  w-full aspect-video  right-8 z-20">
              <Image
                src={Example_Projects}
                alt="Example_Projects"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                // width={500}
                // width={500} automatically provided
                // height={500} automatically provided
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
              />
            </div>
          </div>
        </div>

        <div className="border grid grid-cols-10">
          <div className="border col-span-10 text-lg">
            <div>What else does ResumeAi do?</div>
          </div>
          <div className="border col-span-10 text-lg">
            <div>
              ResumeAi also helps you record the application process so that you
              do not have to open an Excel file to record!
            </div>
          </div>
        </div>

        <div className="border grid grid-cols-10">
          <div className="border col-span-10 text-lg">
            <div>Process</div>
          </div>

          <div className="border col-span-10 text-lg">
            <div className="  w-full aspect-video  right-8 z-20">
              <Image
                src={Example_Process}
                alt="Example_Process"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                // width={500}
                // width={500} automatically provided
                // height={500} automatically provided
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
