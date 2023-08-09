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
      <table className="table-fixed w-full border-4 border-[#102C57]">
        <thead className=" border-4 border-[#102C57]">
          <tr className=" border-4 border-[#102C57]">
            <th className=" border-4 border-[#102C57]">
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
            <td className=" border-e-4 border-[#102C57]">
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
            <td className=" border-e-4 border-[#102C57]">
              <div className="text-xl flex ">
                <div className="flex ">
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
    </div>
  );
}
