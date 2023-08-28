"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";

import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
  FormGroup,
  Icon,
  InputGroup,
  Switch,
  TextArea,
} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

import { useRouter } from "next/navigation";
import Loading from "../../loading";
// import data from "@/utils/data";

import toast, { Toaster } from "react-hot-toast";

export default function ResumeDetail({
  params,
}: {
  params: { resumeID: string };
}) {
  const router = useRouter();

  const [data_csr, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
          localStorage.setItem("stage_3", Stage_3);

          //store the "matches" from chatgpt / other algorithms to localStorage
          //we dont use, JSON.stringify becuz it has already been "stringify" before fetch
          localStorage.setItem("matches", Matches);

          //store the "unmatches" from chatgpt / other algorithms to localStorage
          //we dont use, JSON.stringify becuz it has already been "stringify" before fetch
          localStorage.setItem("unmatches", Unmatches);

          //store the "job related"
          localStorage.setItem("job_details", Job_Details);

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
    }
  }, []);

  const ClickHandler = () => {
    // localStorage.setItem("resumeID", params.resumeID);
    //Jump to "/resume"
    router.push(`/resume/${params.resumeID}`);
  };

  const updateHandler = async () => {
    console.log(data_csr);

    await fetch(`/api/user/resume/${params.resumeID}/edit`, {
      method: "POST",
      //need to stringify all the thing BEFORE send to API
      body: JSON.stringify({
        resumeID: params.resumeID,
        job_details: data_csr.job_details,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => toast.success(data?.message))
      // .then((res) => toast.success(res?.json().message))
      .catch(() => toast.error("Cannot Edit Job Details!"));
  };

  if (isLoading === true) {
    return <Loading />;
  }
  if (isLoading === false) {
    return (
      <div>
        {/* <Toaster /> */}
        <div className="flex">
          <div className="w-1/2 border-2 ">
            <img src={data_csr?.image.src} alt="" />
          </div>

          <div className="w-1/2 border-4 text-black ">
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
              <div className="text-xl font-black text-gray-900 flex justify-between">
                <div>Job Details</div>
                <Button
                  style={{
                    backgroundColor: "rgba(255,0,0,0.6)",
                    borderRadius: "25% 10%",
                  }}
                  className=" "
                  onClick={updateHandler}
                  icon={
                    <Icon
                      icon="updated"
                      className=""
                      style={{ color: "white" }}
                      size={10}
                    />
                  }
                  small
                  text="Update"
                />
              </div>

              <div className="grid grid-cols-10 w-full mb-2">
                <div className=" col-span-2 border flex justify-center">
                  Company:
                </div>
                <div className=" col-span-8 break-words border">
                  <InputGroup
                    onChange={(e) =>
                      setData({
                        ...data_csr,
                        job_details: {
                          ...data_csr.job_details,
                          company_name: e.target.value,
                        },
                      })
                    }
                    value={
                      data_csr?.job_details?.company_name
                        ? data_csr?.job_details?.company_name
                        : ""
                    }
                    fill
                  />
                </div>
              </div>

              <div className="grid grid-cols-10 w-full mb-2">
                <div className=" col-span-2 border flex justify-center">
                  Position:
                </div>
                <div className=" col-span-8 break-words">
                  <InputGroup
                    onChange={(e) =>
                      setData({
                        ...data_csr,
                        job_details: {
                          ...data_csr.job_details,
                          job_position: e.target.value,
                        },
                      })
                    }
                    value={
                      data_csr?.job_details?.job_position
                        ? data_csr?.job_details?.job_position
                        : ""
                    }
                    fill
                  />
                </div>
              </div>

              <div className="grid grid-cols-10 w-full mb-2">
                <div className=" col-span-2 border flex justify-center">
                  Website:
                </div>
                <div className=" col-span-8 break-words">
                  <InputGroup
                    onChange={(e) =>
                      setData({
                        ...data_csr,
                        job_details: {
                          ...data_csr.job_details,
                          website: e.target.value,
                        },
                      })
                    }
                    value={
                      data_csr?.job_details?.website
                        ? data_csr?.job_details?.website
                        : ""
                    }
                    fill
                  />
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
            <div className="border py-5 flex justify-center items-center">
              <Button
                className="font-semibold"
                style={{
                  backgroundColor: "rgba(0,0,255,0.6)",
                  borderRadius: "25% 10%",
                }}
                onClick={ClickHandler}
                icon={
                  <Icon
                    icon="edit"
                    className=" "
                    style={{ color: "white" }}
                    size={10}
                  />
                }
                text="Edit"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
