import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import Technical_Skills from "../../public/Technical_Skills.png";
import Example_Work_Exp_1 from "../../public/Example_Work_Exp_1.png";
import Example_Work_Exp_2 from "../../public/Example_Work_Exp_2.png";
import Example_Projects from "../../public/Example_Projects.png";
import Example_Process from "../../public/Example_Process.png";
import Image from "next/image";

export default function Introduction() {
  return (
    <div className="px-48 py-10">
      <div className="border grid grid-cols-10">
        <div className="border col-span-6 text-lg">
          Have you ever wondered &apos;why I&apos;m a fit to this position, but
          still received rejection letter?&apos;
        </div>
        <div className=" col-span-4" />

        <div className=" col-span-4" />

        <div className="border col-span-6 text-lg">
          <div>Yeah, I can hear you! me too!</div>
          <div>
            After ~150 applications on ndeed/LinkedIn/GlassDoor and other
            methods, I am still like you.
          </div>
        </div>
      </div>

      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th>
              <div className="font-sans font-semibold text-2xl">
                <span className=" italic">Static Resume</span> &nbsp;
              </div>
            </th>
            <th>
              <div className="font-sans font-semibold text-2xl">
                <span className=" italic">Dynamic Resume</span> &nbsp;
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {" "}
              <div className="text-xl flex list-none">
                <div className="flex">
                  <span>❌</span>
                  <div>
                    Use the{" "}
                    <span className=" italic font-semibold underline">
                      Same Resume
                    </span>{" "}
                    to apply for{" "}
                    <span className=" italic font-semibold">Every</span>{" "}
                    companies
                  </div>
                </div>
              </div>
            </td>
            <td>
              {" "}
              <div className="text-xl flex list-none">
                <div className="flex">
                  <span>✔️</span>
                  <div>
                    Dynamically adjust your Resume based on Job Description of{" "}
                    <span className=" italic font-semibold">Each</span> company
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="text-xl flex">
                <div className="flex">
                  <span>❌</span>
                  <div className="grid grid-cols-10">
                    <div className=" col-span-10">
                      highlight keywords of your resume
                    </div>
                    <div className=" col-span-1" />
                    <div className=" col-span-9">
                      <div className="flex">
                        <li />
                        <span className=" text-base">
                          HR can&apos;t notice keywords easily
                        </span>
                      </div>
                    </div>
                    <div className=" col-span-1" />
                    <div className=" col-span-9">
                      <div className="flex">
                        <li />
                        <span className=" text-base">
                          Receive phone call interview ↓
                        </span>
                      </div>
                    </div>
                    <div className=" col-span-1" />
                    <div className=" col-span-9">
                      <div className="flex">
                        <li />
                        <span className=" text-base">Rejection ↑ </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="text-xl flex ">
                <div className="flex">
                  <span>✔️</span>
                  <div className="grid grid-cols-10">
                    <div className=" col-span-10">
                      highlight keywords of your resume
                    </div>
                    <div className=" col-span-1" />
                    <div className=" col-span-9">
                      <div className="flex">
                        <li />
                        <span className=" text-base">
                          HR can notice keywords more obviously
                        </span>
                      </div>
                    </div>
                    <div className=" col-span-1" />
                    <div className=" col-span-9">
                      <div className="flex">
                        <li />
                        <span className=" text-base">
                          Receive phone call interview ↑
                        </span>
                      </div>
                    </div>
                    <div className=" col-span-1" />
                    <div className=" col-span-9">
                      <div className="flex">
                        <li />
                        <span className=" text-base">Rejection ↓ </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          {/* <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
          </tr> */}
        </tbody>
      </table>

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
            ResumeAi firstly selects the Projects match with the Job Description
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
            ResumeAi firstly selects the Projects match with the Job Description
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
  );
}
