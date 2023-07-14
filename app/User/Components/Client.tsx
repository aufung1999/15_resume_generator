"use client";
import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

export default function UserClient({ resumeData }: { resumeData: any }) {
  const router = useRouter();
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
      });
    });
    setEachResume(images_db);
  }, []);

  const ClickHandler = (received: string) => {
    //Jump to another tab
    router.push(`user/resumes/${received}`);
  };
  return (
    <div
      id="user"
      className="grid grid-cols-2 xl:grid-cols-3 place-items-center relative "
    >
      {resume_csr?.map((each, i: number) => (
        <div className="w-1/2 h-full hover:w-5/6 hover:text-lg border" key={i}>
          <div
            className=" flex-col border-4 justify-between h-full"
            onClick={() => ClickHandler(each._id)}
          >
            <div className="border border-green-500 bottom-0 px-2">
              <div className="flex">
                <b className=" w-1/4 flex hover:justify-end">Position</b>
                <b>:</b>
                <div className=" w-3/4">{each.job_details.job_position}</div>
              </div>
              <div className="flex">
                <b className=" w-1/4 flex hover:justify-end">Company</b>
                <b>:</b>
                <div className="  w-3/4">{each.job_details.company_name}</div>
              </div>
              <div className="flex">
                <b className=" w-1/4 flex hover:justify-end">Website</b>
                <b>:</b>
                <div className=" w-3/4 ">{each.job_details.website}</div>
              </div>
              <div className="flex">
                <b className=" w-1/4 flex hover:justify-end">Date</b>
                <b>:</b>
                <div className=" w-3/4 ">{each.createdAt.substring(0, 10)}</div>
              </div>
            </div>
            <div className="border border-red-500">
              <img src={each.image.src} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
