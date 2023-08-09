"use client";
import React, { useState } from "react";
import Technical_Skills from "../../public/Technical_Skills.png";
import Example_Work_Exp_1 from "../../public/Example_Work_Exp_1.png";
import Example_Work_Exp_2 from "../../public/Example_Work_Exp_2.png";
import Example_Projects from "../../public/Example_Projects.png";

import Image from "next/image";

export default function Intro_2_Resume_parts_main_parts() {
  const [openTab_5, setOpenTab_5] = useState(1);

  return (
    <>
      <div className="flex justify-center w-full border">
        <div className="flex flex-col justify-center">
          <div className="bg-[#4F709C] text-white border rounded-t-2xl w-full">
            <ul
              className="flex mb-0 list-none pt-3 pb-4 flex-row sm:flex-row gap-x-2 justify-center"
              role="tablist"
            >
              <li className=" w-1/3">
                <div
                  className={
                    "text-sm  shadow-lg rounded  leading-normal p-2 flex justify-center " +
                    (openTab_5 === 1 ? " " : " opacity-50")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab_5(1);
                  }}
                  data-toggle="tab"
                  // href="#link1"
                  role="tablist"
                >
                  <div>
                    <h1 className="font-bold">Skills</h1>
                  </div>
                </div>
              </li>

              <li className=" w-1/3">
                <div
                  className={
                    "text-sm  shadow-lg rounded  leading-normal p-2 flex justify-center " +
                    (openTab_5 === 2 ? " " : " opacity-50")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab_5(2);
                  }}
                  data-toggle="tab"
                  // href="#link1"
                  role="tablist"
                >
                  <div>
                    <h1 className="font-bold">Work</h1>
                  </div>
                </div>
              </li>
              <li className=" w-1/3">
                <div
                  className={
                    "text-sm  shadow-lg rounded  leading-normal p-2 flex justify-center " +
                    (openTab_5 === 3 ? " " : " opacity-50")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab_5(3);
                  }}
                  data-toggle="tab"
                  // href="#link1"
                  role="tablist"
                >
                  <div>
                    <h1 className="font-bold">Projects</h1>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Technical Skills */}

          <div className=" relative w-full border">
            <div
              className={`border grid grid-cols-10 ${
                openTab_5 === 1 ? "" : " hidden"
              }`}
            >
              <div className="border col-span-10 ">
                <div className="font-sans font-semibold text-xl p-2 underline">
                  ResumeAi re-orders the Skills according to the Job Description
                </div>
              </div>
              <div className="border col-span-10 text-lg">
                <div className="  w-full aspect-video  right-8 z-20">
                  <Image
                    src={Technical_Skills}
                    alt="Technical_Skills"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    // width={500}
                    // width={500} automatically provided
                    // height={500} automatically provided
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                  />
                </div>
              </div>
            </div>

            {/* Working Experience */}

            <div
              className={`border grid grid-cols-10 ${
                openTab_5 === 2 ? "" : " hidden"
              }`}
            >
              <div className="border col-span-10 text-lg">
                <div className="font-sans font-semibold text-xl p-2 underline">
                  ResumeAi checks if the Working Experience matches with the Job
                  Description
                </div>
              </div>
              <div className="border col-span-5 text-lg">
                <div className=" italic font-semibold underline p-2">
                  Example 1
                </div>
                <div className="  w-full aspect-video  right-8 z-20 ">
                  <Image
                    src={Example_Work_Exp_1}
                    alt="Example_Work_Exp_1"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
              <div className="border col-span-5 text-lg">
                <div className=" italic font-semibold underline p-2">
                  Example 2
                </div>
                <div className="  w-full aspect-video  right-8 z-20">
                  <Image
                    src={Example_Work_Exp_2}
                    alt="Example_Work_Exp_2"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Personal/Collaberative Projects */}

            <div
              className={`border grid grid-cols-10 ${
                openTab_5 === 3 ? "" : " hidden"
              }`}
            >
              <div className="border col-span-10 text-lg">
                <div className="font-sans font-semibold text-xl p-2 underline">
                  ResumeAi firstly selects the Projects match with the Job
                  Description
                </div>
              </div>
              <div className="border col-span-10 text-lg">
                <div className="  w-full aspect-video  right-8 z-20">
                  <Image
                    src={Example_Projects}
                    alt="Example_Projects"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
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
        </div>
      </div>
    </>
  );
}
