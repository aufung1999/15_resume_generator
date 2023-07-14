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
        <div className="w-1/2 h-full hover:w-5/6 border" key={i}>
          <div
            className=" flex-col border-4 justify-between h-full"
            onClick={() => ClickHandler(each._id)}
          >
            <div className="border border-green-500 bottom-0 hover:text-lg ">
              <div className="grid grid-cols-10 place-items-center ">
                <b className=" col-span-3">Position: </b>
                <div className=" col-span-7">
                  {each.job_details.job_position}
                </div>
              </div>
              <div className="grid grid-cols-10 place-items-center ">
                <b className=" col-span-3 ">Company: </b>
                <div className=" col-span-7">
                  {each.job_details.company_name}
                </div>
              </div>
              <div className="grid grid-cols-2 place-items-center ">
                <b>Website: </b>
                <div>{each.job_details.website}</div>
              </div>
              <div>{each.createdAt}</div>
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
