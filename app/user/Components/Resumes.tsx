"use client";
import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";

import "@blueprintjs/core/lib/css/blueprint.css";

import Search from "./Search";

import toast, { Toaster } from "react-hot-toast";
import EachResume from "./Resume";

export default function Resume({ resumeData }: { resumeData: any }) {
  const search_redux = useSelector((state: RootState) => state.control.search);

  const [resumes_copy, setResumes_copy] = useState<any[]>([]);
  const [resumes_csr, setResumes] = useState<any[]>([]);

  useEffect(() => {
    if (resumes_copy) setResumes(resumes_copy);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search_redux]);

  useEffect(() => {
    console.log( resumeData)
    let resumes_db: any[] = [];
    resumeData?.map(async (each: any) => {
      const img = new Image();
      img.src = each.HTMLDIVElement;
      resumes_db.push({
        _id: each._id,
        image: img,
        job_details: JSON.parse(each.Job_Details),
        createdAt: each.createdAt,
        matches: JSON.parse(each.Matches),
        unmatches: JSON.parse(each.Unmatches),
        response: each.Response,
      });
    });
    // for the local
    setResumes(resumes_db);
    //for the copy after search
    setResumes_copy(resumes_db);
  }, [resumeData]);

  //==========================================================================

  return (
    <div className=" relative ">
      <div id="user" className="  border-4 bg-[#F8F0E5] px-48 ">
        {/* Search Engine */}
        <Search resume_csr={resumes_csr} setResumes={setResumes} />
        {/* if the grid-cols-3 changes, Remember to change the show left or right */}
        <div className="grid grid-cols-3 gap-10 place-items-start relative">
          {resumes_csr?.map((each: any, i: number) => (
            <div key={i} className=" h-full">
              <EachResume
                each={each}
                key={"resume-" + i}
                resumes_csr={resumes_csr}
                setResumes={setResumes}
                setResumes_copy={setResumes_copy}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div className=" col-span-3 h-screen border-2 relative">
        <div className=" border border-red-300 absolute w-full ">
          <div className="group-hover/left:block border-red-300 border bg-white">
            <div className="border">
              <div className="text-xl font-black text-gray-900 ">
                Job Details
              </div>

              <div className="grid grid-cols-10 w-full mb-2">
                <div className=" col-span-2 border flex justify-center">
                  Company:
                </div>
                <div className=" col-span-8 break-words">
                  {job_details_redux.company_name}
                </div>
              </div>

              <div className="grid grid-cols-10 w-full mb-2">
                <div className=" col-span-2 border flex justify-center">
                  Position:
                </div>
                <div className=" col-span-8 break-words">
                  {job_details_redux.job_position}
                </div>
              </div>

              <div className="grid grid-cols-10 w-full mb-2">
                <div className=" col-span-2 border flex justify-center">
                  Website:
                </div>
                <div className=" col-span-8 break-words">
                  {job_details_redux.website}
                </div>
              </div>
            </div>
            <div className="border border-blue-300 relative">
              <PieChart
                animationDuration={500}
                animationEasing="ease-out"
                center={[50, 50]}
                data={[
                  {
                    title: "Un-Matches",
                    value: Number(preview_redux?.unmatches.length),
                    color: "#ff869c",
                  },
                  {
                    title: "Matches",
                    value: Number(preview_redux?.matches.length),
                    color: "#a7ff78",
                  },
                ]}
                labelPosition={50}
                lengthAngle={360}
                lineWidth={35}
                paddingAngle={0}
                radius={50}
                startAngle={0}
                viewBoxSize={[100, 100]}
              />
              <div className="border text-sm flex justify-center items-center me-5 absolute top-0 w-full h-full">
                <div className="text-4xl font-black text-gray-900 dark:text-white">
                  {preview_redux &&
                    (
                      (preview_redux?.matches.length /
                        (preview_redux?.matches.length +
                          preview_redux?.unmatches.length)) *
                      100
                    ).toFixed(2)}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
