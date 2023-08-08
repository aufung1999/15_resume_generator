import React from "react";
import Technical_Skills from "../../public/Technical_Skills.png";
import Image from "next/image";

export default function Intro_Resumes_parts() {
  return (
    <div>
      <div className="border grid grid-cols-10">
        <div className="border col-span-10 text-lg">
          <div>
            The main parts of a resume are Technical Skills, Working Experience
            and Personal/Collaberative Projects.
          </div>
          <div>
            Therefore, ResumeAi focuses on these parts, and helps you generate a
            Dynamic Resume to pass application stage and move to the phone call
            interview.
          </div>
        </div>
      </div>

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
      </div>

      <div className="border grid grid-cols-10">
        <div className="border col-span-10 text-lg">
          <div>Personal/Collaberative Projects</div>
        </div>
        <div className="border col-span-10 text-lg">
          <div>
            ResumeAi firstly selects the Projects match with the Job Description
          </div>
        </div>
      </div>
    </div>
  );
}
