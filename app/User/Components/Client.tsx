"use client";
import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

export default function UserClient({ resumeData }: { resumeData: any }) {
  const router = useRouter();
  const [resume_csr, setEachResume] = useState<any[]>([]);

  useEffect(() => {
    let images_db: any[] = [];
    resumeData.map(async (each) => {
      var img = new Image();
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
    <div id="user" className="grid grid-cols-2">
      {resume_csr?.map((each, i: number) => (
        <div
          className="w-1/2 relative hover:w-full "
          key={i}
          onClick={() => ClickHandler(each._id)}
        >
          <img src={each.image.src} />
          <div>{each.job_details.job_position}</div>
          <div>{each.job_details.company_name}</div>
          <div>{each.job_details.website}</div>
          <div>{each.createdAt}</div>
        </div>
      ))}
    </div>
  );
}
