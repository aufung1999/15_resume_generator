"use client";
import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { editPreview, editSearch } from "@/slices/controlSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Icon, InputGroup, Button } from "@blueprintjs/core";

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

  const [resume_csr, setEachResume] = useState<any[]>([]);

  useEffect(() => {
    let images_db: any[] = [];
    resumeData.map(async (each) => {
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
    setEachResume(images_db);
  }, []);

  const searchHandler = () => {
    if (resume_csr.length > 0 && search_redux !== "") {
      const filtered_array = resume_csr.filter(
        (each) => each.job_details.job_position === search_redux
      );
      console.log(filtered_array);
    }
  };

  const ClickHandler = (received: string) => {
    //Jump to another tab
    router.push(`user/resumes/${received}`);
  };
  return (
    <div className=" grid grid-cols-12 relative">
      <div className=" col-span-1"></div>

      <div id="user" className=" col-span-7 border-4">
        <div>
          Search
          <InputGroup
            id="text-input"
            onChange={(e) => dispatch(editSearch(e.target.value))}
            value={search_redux}
            className="w-full border overflow-hidden"
          />
          <Button
            icon={
              <Icon icon="search" className="" style={{ color: "white" }} />
            }
            onClick={searchHandler}
            fill
            style={{
              backgroundColor: "rgba(0,120,255,1)",
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3 place-items-start relative ">
          {resume_csr?.map((each, i: number) => (
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
                        job_details: "",
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
