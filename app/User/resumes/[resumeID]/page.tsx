"use client";
import React, { useState, useEffect, useRef } from "react";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Switch,
  TextArea,
} from "@blueprintjs/core";
import { useRouter } from "next/navigation";

export default function ResumeDetail({
  params,
}: {
  params: { resumeID: string };
}) {
  const router = useRouter();

  const [data_csr, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    //fetch from the database
    //Using Dynamic Route
    fetch(`/api/user/resume/${params.resumeID}`)
      .then((res) => res.json())
      .then((data) => {
        const {
          HTMLDIVElement,
          Stage_3,
          Matches,
          Unmatches,
          Job_Details,
          ...rest
        } = data;
        //for Resume image
        const img = new Image();
        img.src = HTMLDIVElement;

        //store the result from chatgpt / other algorithms to localStorage  ***Choose
        //we dont use, JSON.stringify becuz it has already been "stringify" before fetch
        window.localStorage.setItem("stage_3", Stage_3);

        //store the "matches" from chatgpt / other algorithms to localStorage
        //we dont use, JSON.stringify becuz it has already been "stringify" before fetch
        window.localStorage.setItem("matches", Matches);

        //store the "unmatches" from chatgpt / other algorithms to localStorage
        //we dont use, JSON.stringify becuz it has already been "stringify" before fetch
        window.localStorage.setItem("unmatches", Unmatches);

        //store the "job related"
        window.localStorage.setItem(
          "job_details",
          JSON.stringify({
            job_position: Job_Details.job_position,
            company_name: Job_Details.company_name,
            website: Job_Details.website,
          })
        );

        setData({
          image: img,
          stage_3: JSON.parse(Stage_3),
          matches: JSON.parse(Matches),
          unmatches: JSON.parse(Unmatches),
          job_details: JSON.parse(Job_Details),
          ...rest,
        });
        setLoading(false);
      });
  }, []);

  const ClickHandler = () => {
    //Jump to "/resume"
    router.push("/resume");
  };

  return (
    <div>
      <h1>Details about product {params.resumeID}</h1>
      {console.log(data_csr)}
      <div className="flex">
        <div className="w-1/2 border-2">
          <img src={data_csr?.image.src} />
        </div>
        <div className="w-1/2 border-4 text-black">
          <div className="border">{data_csr?.createdAt}</div>
          <div className="border">
            <div>Job Details</div>
            <div>{data_csr?.job_details?.company_name}</div>
            <div>{data_csr?.job_details?.job_position}</div>
            <div>{data_csr?.job_details?.website}</div>
          </div>
          <div className="border">
            <div>Matches</div>
            {data_csr?.matches?.map((each, i) => (
              <div key={i} className=" break-words">
                {each}
              </div>
            ))}
          </div>
          <div className="border">
            <div>Un-Matches</div>
            {data_csr?.unmatches?.map((each, i) => (
              <div key={i} className=" break-words">
                {each}
              </div>
            ))}
          </div>
          <div className="border">
            <Button onClick={ClickHandler}>Edit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
