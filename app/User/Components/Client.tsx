"use client";
import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editPreview, editSearch } from "@/slices/controlSlice";

import { RootState } from "@/store/store";

import { Icon, InputGroup, Button, FormGroup } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

import Search from "../skills/Components/Search";

export default function UserClient({ resumeData }: { resumeData: any }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const preview_redux = useSelector(
    (state: RootState) => state.control.preview
  );
  const job_details_redux = useSelector(
    (state: RootState) => state.control.job_details
  );

  const search_redux = useSelector((state: RootState) => state.control.search);

  const [resumes_copy, setResumes_copy] = useState<any[]>([]);
  const [resumes_csr, setResumes] = useState<any[]>([]);

  useEffect(() => {
    if (resumes_copy) setResumes(resumes_copy);
  }, [search_redux]);

  useEffect(() => {
    let images_db: any[] = [];
    resumeData.map(async (each: any) => {
      const img = new Image();
      img.src = each.HTMLDIVElement;
      images_db.push({
        _id: each._id,
        image: img,
        job_details: JSON.parse(each.Job_Details),
        createdAt: each.createdAt,
        matches: JSON.parse(each.Matches),
        unmatches: JSON.parse(each.Unmatches),
      });
    });
    // for the local
    setResumes(images_db);
    //for the copy after search
    setResumes_copy(images_db);
  }, []);

  const ClickHandler = (received: string) => {
    //Jump to another tab
    router.push(`user/resumes/${received}`);
  };
  return (
    <div className=" grid grid-cols-12 relative">
      <div className=" col-span-1"></div>

      <div id="user" className=" col-span-7 border-4">
        {/* Search Engine */}
        <Search resume_csr={resumes_csr} setResumes={setResumes} />
        <div className="grid grid-cols-3 gap-3 place-items-start relative ">
          {resumes_csr?.map((each: any, i: number) => (
            <div key={i} className="group/left relative ">
              {/* Job Description */}
              <div className="border border-green-500 bottom-0 px-2 bg-white ">
                <div className="flex">
                  <b className=" w-1/4 flex group-hover/left:justify-end">
                    Position
                  </b>
                  <b>:</b>
                  <div className=" w-3/4">{each.job_details.job_position}</div>
                </div>
                <div className="flex">
                  <b className=" w-1/4 flex group-hover/left:justify-end">
                    Company
                  </b>
                  <b>:</b>
                  <div className="  w-3/4">{each.job_details.company_name}</div>
                </div>
                <div className="flex">
                  <b className=" w-1/4 flex group-hover/left:justify-end">
                    Website
                  </b>
                  <b>:</b>
                  <div className=" w-3/4 ">{each.job_details.website}</div>
                </div>
                <div className="flex">
                  <b className=" w-1/4 flex group-hover/left:justify-end">
                    Date
                  </b>
                  <b>:</b>
                  <div className=" w-3/4 ">
                    {each.createdAt.substring(0, 10)}
                  </div>
                </div>
              </div>

              {/* The image and the introduction */}
              <div
                className="group-hover/left:scale-[1.8] group-hover/left:absolute group-hover/left:flex group-hover/left:justify-center transition duration-500 border-4 flex hover:z-20 z-10"
                onClick={() => ClickHandler(each._id)}
              >
                <img
                  src={each.image.src}
                  alt=""
                  onMouseEnter={() =>
                    dispatch(
                      editPreview({
                        matches: each.matches,
                        unmatches: each.unmatches,
                        job_details: each.job_details,
                      })
                    )
                  }
                  onMouseLeave={() =>
                    dispatch(
                      editPreview({
                        matches: [],
                        unmatches: [],
                        job_details: {
                          job_position: "",
                          company_name: "",
                          website: "",
                        },
                      })
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" col-span-1"></div>

      <div className=" col-span-3 h-screen border-2 relative">
        <div className=" border border-red-300 absolute w-full ">
          <div className="group-hover/left:block border-red-300 border bg-white">
            <div>{job_details_redux.job_position}</div>
            <div>{job_details_redux.company_name}</div>
            <div>{job_details_redux.website}</div>
            <div>
              <div>Matches:</div>
              <div>
                {preview_redux.matches?.map((item: string, i) => (
                  <div key={i} className=" text-xs break-words w-full">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>UnMatches:</div>
              <div>
                {preview_redux.unmatches?.map((item: string, i) => (
                  <div key={i} className=" break-words text-xs w-full">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" absolute border-4 flex justify-center px-96 hidden">
        <div>
          <img src={preview_redux.img.src} />
        </div>
      </div> */}
    </div>
  );
}
