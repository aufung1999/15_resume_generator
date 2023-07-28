"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";

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
import Loading from "../../loading";

export default function ResumeDetail({
  params,
}: {
  params: { resumeID: string };
}) {
  const router = useRouter();

  const [data_csr, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
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
        window.localStorage.setItem("job_details", Job_Details);

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
    // localStorage.setItem("resumeID", params.resumeID);
    //Jump to "/resume"
    router.push(`/resume/${params.resumeID}`);
  };
  if (isLoading === true) {
    return <Loading />;
  }
  if (isLoading === false) {
    return (
      <div>
        <div className="flex">
          <div className="w-1/2 border-2 ">
            <img src={data_csr?.image.src} alt="" />
          </div>

          <div className="w-1/2 border-4 text-black">
            <div className="border text-lg flex justify-between me-5">
              {/* Calculate the % of the matches out of ALL  */}
              <div className="text-4xl font-black text-gray-900 dark:text-white">
                {(
                  (data_csr?.matches.length /
                    (data_csr?.matches.length + data_csr?.unmatches.length)) *
                  100
                ).toFixed(2)}
                %
              </div>
              <div className="text-4xl font-black text-gray-900 dark:text-white">
                {data_csr?.createdAt.substring(0, 10)}
              </div>
            </div>
            <div className="border">
              <div className="text-xl font-black text-gray-900 ">
                Job Details
              </div>

              <div className="grid grid-cols-10 w-full mb-2">
                <div className=" col-span-2 border flex justify-center">
                  Company:
                </div>
                <div className=" col-span-8 break-words">
                  {data_csr?.job_details?.company_name}
                </div>
              </div>

              <div className="grid grid-cols-10 w-full mb-2">
                <div className=" col-span-2 border flex justify-center">
                  Position:
                </div>
                <div className=" col-span-8 break-words">
                  {data_csr?.job_details?.job_position}
                </div>
              </div>

              <div className="grid grid-cols-10 w-full mb-2">
                <div className=" col-span-2 border flex justify-center">
                  Website:
                </div>
                <div className=" col-span-8 break-words">
                  {data_csr?.job_details?.website}
                </div>
              </div>
            </div>
            <div className="border">
              <div className="text-xl font-black text-gray-900 ">Matches</div>
              {data_csr?.matches?.map((each: string[], i: number) => (
                <div key={i} className="grid grid-cols-10 w-full mb-2">
                  <div className=" col-span-1 border flex justify-center">
                    {i + 1}
                  </div>
                  <div className=" col-span-9 break-words">{each}</div>
                </div>
              ))}
            </div>
            <div className="border">
              <div className="text-xl font-black text-gray-900 ">
                Un-Matches
              </div>
              {data_csr?.unmatches?.map((each: string[], i: number) => (
                <div key={i} className="grid grid-cols-10 w-full mb-2">
                  <div className=" col-span-1 border flex justify-center">
                    {i + 1}
                  </div>
                  <div className=" col-span-9 break-words">{each}</div>
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
}
