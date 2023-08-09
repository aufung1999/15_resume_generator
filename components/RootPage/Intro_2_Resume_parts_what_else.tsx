import React from "react";

import Excel from "../../public/Excel.png";
import Image from "next/image";

export default function Intro_2_Resume_parts_what_else() {
  return (
    <>
      <div className="border rounded-2xl grid grid-cols-10">
        <div className="border col-span-5 text-lg">
          <div className="font-sans font-semibold text-2xl">
            What else does ResumeAi do?
          </div>
          <div>
            <div className="grid grid-cols-10">
              <div className=" col-span-10">
                ResumeAi also helps you record the application info.
              </div>
              <div className=" col-span-1" />
              <div className=" col-span-9">
                <div className="flex">
                  <li />
                  <span className=" text-base">Company name</span>
                </div>
              </div>
              <div className=" col-span-1" />
              <div className=" col-span-9">
                <div className="flex">
                  <li />
                  <span className=" text-base">Date</span>
                </div>
              </div>
              <div className=" col-span-1" />
              <div className=" col-span-9">
                <div className="flex">
                  <li />
                  <span className=" text-base">which Website</span>
                </div>
              </div>
              <div className=" col-span-1" />
              <div className=" col-span-9">
                <div className="flex">
                  <li />
                  <span className=" text-base">Job Position</span>
                </div>
              </div>
              <div className=" col-span-1" />
              <div className=" col-span-9">
                <div className="flex">
                  <li />
                  <span className=" text-base">Application Porcess</span>
                </div>
              </div>
            </div>

            <div>
              <span>❌</span> Open an Excel file to record!
            </div>
          </div>
        </div>
        <div className="border col-span-5 text-lg">
          <div className=" bg-[#4F709C] h-full flex justify-center items-center">
            <div className="  w-full z-20 flex">
              <Image src={Excel} alt="Excel" width={100} />
              <div>+ ResumeAi</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
