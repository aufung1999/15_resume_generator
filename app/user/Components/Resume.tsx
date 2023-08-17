import React, { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";
// import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editPreview, editSearch } from "@/slices/controlSlice";

import { RootState } from "@/store/store";

import { Icon, InputGroup, Button, FormGroup } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Colors } from "@blueprintjs/core";

import { PieChart } from "react-minimal-pie-chart";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import MdPhone from "@mui/icons-material/Phone";

import toast, { Toaster } from "react-hot-toast";

import { styled } from "@mui/material/styles";

import congratulation from "../../../public/congratulation.gif";
import ShowOnce from "@/utils/ShowOnce";

const CustomWidthTooltip = styled(
  ({
    title,
    children,
    className,
    ...props
  }: {
    className: string;
    title: React.ReactNode;
    children: React.ReactElement;
  }) => (
    <Tooltip {...props} title={title} classes={{ popper: className }}>
      {children}
    </Tooltip>
  )
)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 400,
  },
}) as typeof Tooltip;

export default function EachResume({
  each,
  resumes_csr,
  setResumes,
  setResumes_copy,
}: {
  each: any;
  resumes_csr: any;
  setResumes: Function;
  setResumes_copy: Function;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useDispatch();

  const dispay_format_redux = useSelector(
    (state: RootState) => state.control.dispay_format
  );

  const [responseValue, setResponseValue] = useState<string | null>(null);

  useEffect(() => {
    setResponseValue(each.response);

    return () => setResponseValue(null);
  }, [resumes_csr, dispatch, each.response]);

  const ClickHandler = (received: string) => {
    //Jump to another tab
    router.push(`user/resumes/${received}`);
  };

  //==========================================================================
  const toggleButtonHandler = async (_id: string, value: string) => {
    console.log(_id, value);
    setResponseValue(value);

    await fetch(`/api/user/resume/${_id}`, {
      method: "POST",
      //need to stringify all the thing BEFORE send to API
      body: JSON.stringify({
        resumeID: _id,
        response: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => toast.success(data?.message))
      // .then((res) => toast.success(res?.json().message))
      .catch(() => toast.error("Cannot Update Response Status!"));

    startTransition(() => {
      router.refresh();
    });
  };
  //============================Delete Resume from the Database==============================================
  const deleteHandler = async (_id: string) => {
    const filtered_resumes_csr = resumes_csr.filter(
      (each: any) => each._id === _id
    );
    setResumes(filtered_resumes_csr);
    setResumes_copy(filtered_resumes_csr);
    await fetch(`/api/user/resume/${_id}/delete`, {
      method: "POST",
      //need to stringify all the thing BEFORE send to API
      body: JSON.stringify({
        resumeID: _id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data?.message);
      })
      // .then((res) => toast.success(res?.json().message))
      .catch(() => toast.error("Cannot delete Resume"));

    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      {/* ********************************************************* */}
      {/* mode of "picture" */}
      {/* ********************************************************* */}
      {dispay_format_redux === "picture" && (
        <div className=" h-full flex flex-col justify-between">
          {/* <Toaster /> */}
          <div className="w-full">
            {/* 1 */}
            {/* Job Description */}
            <div className="border border-green-500 bottom-0 px-2 bg-white h-36 ">
              <div className="flex flex-col justify-between h-full">
                <div className="border">
                  <div className="flex flex-col">
                    <b className="  flex hover:justify-end">Position</b>
                    <div className="">{each.job_details.job_position}</div>
                  </div>
                </div>
                <div className="flex-col border">
                  <div className="flex">
                    <b className=" w-1/4 flex hover:justify-end">Company</b>
                    <b>:</b>
                    <div className="  w-3/4">
                      {each.job_details.company_name}
                    </div>
                  </div>
                  <div className="flex">
                    <b className=" w-1/4 flex hover:justify-end">Website</b>
                    <b>:</b>
                    <div className=" w-3/4 ">{each.job_details.website}</div>
                  </div>
                  <div className="flex">
                    <b className=" w-1/4 flex hover:justify-end">Date</b>
                    <b>:</b>
                    <div className=" w-3/4 ">
                      {each.createdAt.substring(0, 10)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 2 */}
            {/* Qualify if the resume gets response */}
            <div className="w-full flex h-7 border">
              <Button
                className="w-full bg-red-400"
                value="rejected"
                onClick={() => toggleButtonHandler(each._id, "rejected")}
                style={
                  responseValue === "rejected"
                    ? { background: Colors.RED5 }
                    : { background: Colors.WHITE }
                }
              >
                <div>
                  <CloseIcon style={{ fill: "red" }} />
                </div>
              </Button>

              <Button
                className="w-full bg-red-400"
                value="phone"
                onClick={() => toggleButtonHandler(each._id, "phone")}
                style={
                  responseValue === "phone"
                    ? { background: Colors.BLUE5 }
                    : { background: Colors.WHITE }
                }
              >
                <div>
                  <MdPhone style={{ fill: "black" }} />
                </div>
              </Button>

              <Button
                className="w-full bg-red-400"
                value="first"
                onClick={() => toggleButtonHandler(each._id, "first")}
                style={
                  responseValue === "first"
                    ? { background: "#fff9c4" }
                    : { background: Colors.WHITE }
                }
              >
                <div>1st</div>
              </Button>

              <Button
                className="w-full bg-red-400"
                value="second"
                onClick={() => toggleButtonHandler(each._id, "second")}
                style={
                  responseValue === "second"
                    ? { background: "#fff176" }
                    : { background: Colors.WHITE }
                }
              >
                <div>2nd</div>
              </Button>

              <Button
                className="w-full bg-red-400"
                value="third"
                onClick={() => toggleButtonHandler(each._id, "third")}
                style={
                  responseValue === "third"
                    ? { background: "#ffeb3b" }
                    : { background: Colors.WHITE }
                }
              >
                <div>3rd</div>
              </Button>

              <Button
                className="w-full bg-red-400"
                value="fourth"
                onClick={() => toggleButtonHandler(each._id, "fourth")}
                style={
                  responseValue === "fourth"
                    ? { background: "#ffc107" }
                    : { background: Colors.WHITE }
                }
              >
                <div>4th</div>
              </Button>

              <Button
                className="w-full relative"
                value="offer"
                onClick={() => toggleButtonHandler(each._id, "offer")}
                style={
                  responseValue === "offer"
                    ? { background: Colors.GREEN5 }
                    : { background: Colors.WHITE }
                }
              >
                <div className=" w-full relative">
                  {responseValue === "offer" && (
                    <ShowOnce
                      mode={"animate__flipInX"}
                      speed={"animate__fast"}
                      delay={"animate__delay-0s"}
                    >
                      <img
                        className=" w-full absolute scale-[1.8]"
                        src={congratulation.src}
                        alt="congratulation"
                      />
                    </ShowOnce>
                  )}
                  <DoneIcon style={{ fill: "green", width: "100%" }} />
                </div>
              </Button>
            </div>
            {/* 3 */}
            {/* The image and the introduction */}
            <div
              className=" border-4 flex  hover:scale-[1.8] transition duration-300"
              onClick={() => ClickHandler(each._id)}
            >
              <CustomWidthTooltip
                title={
                  <div>
                    <div className="border border-green-500 bottom-0 px-2  ">
                      <div className="flex">
                        <b className=" w-1/4 flex group-hover/left:justify-end">
                          Position
                        </b>
                        <b>:</b>
                        <div className=" w-3/4">
                          {each.job_details.job_position}
                        </div>
                      </div>
                      <div className="flex">
                        <b className=" w-1/4 flex group-hover/left:justify-end">
                          Company
                        </b>
                        <b>:</b>
                        <div className="  w-3/4">
                          {each.job_details.company_name}
                        </div>
                      </div>
                      <div className="flex">
                        <b className=" w-1/4 flex group-hover/left:justify-end">
                          Website
                        </b>
                        <b>:</b>
                        <div className=" w-3/4 ">
                          {each.job_details.website}
                        </div>
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
                    <div className="border border-blue-300 relative w-full flex justify-center">
                      <PieChart
                        className="w-1/3"
                        data={[
                          {
                            title: "Un-Matches",
                            value: Number(each?.unmatches.length),
                            color: "#ff869c",
                          },
                          {
                            title: "Matches",
                            value: Number(each?.matches.length),
                            color: "#a7ff78",
                          },
                        ]}
                      />
                      <div className="border text-sm flex justify-center items-center  absolute  w-full h-full">
                        <div className="text-xl font-black text-black">
                          {(
                            (each?.matches.length /
                              (each?.matches.length + each?.unmatches.length)) *
                            100
                          ).toFixed(2)}
                          %
                        </div>
                      </div>
                    </div>
                    <div className=" font-bold flex justify-center">
                      Matches
                    </div>
                    <div className="break-words">
                      {each.matches?.map((item: string, ind: number) => (
                        <div className="flex " key={"match" + ind}>
                          <div>{ind + 1}: </div>
                          <div className=" ">{item}</div>
                        </div>
                      ))}
                    </div>
                    <div className=" font-bold flex justify-center">
                      Un-Matches
                    </div>
                    <div className="break-words">
                      {each.unmatches?.map((item: string, ind: number) => (
                        <div className="flex break-words" key={"unmatch" + ind}>
                          <div>{ind + 1}: </div>
                          <div>{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
                placement="right"
                enterDelay={550}
              >
                <img
                  className=" hover:z-20 "
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
              </CustomWidthTooltip>
            </div>
          </div>
          {/* 4 */}
          {/* delete */}
          <div className=" ">
            <Button
              className="w-full bg-red-400"
              value="false"
              onClick={() => deleteHandler(each._id)}
              // style={
              //   responseValue === "false"
              //     ? { background: Colors.RED5 }
              //     : { background: Colors.WHITE }
              // }
            >
              <div className=" text-red-500">Delete</div>
            </Button>
          </div>
        </div>
      )}
      {/* ********************************************************* */}
      {/* mode of "list" */}
      {/* ********************************************************* */}
      {dispay_format_redux === "list" && (
        <div className=" w-full flex border-8">
          <Toaster />
          <div className="flex justify-between  w-full">
            {/* 1 */}
            {/* Job Description */}
            <div className="border border-green-500 bottom-0 px-2 bg-white w-full">
              <div className="flex flex-col  ">
                <div className="flex">
                  <b className="flex ">Position</b>
                  <b>:</b>
                  <div className=" ">{each.job_details.job_position}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex">
                    <b className="flex ">Company</b>
                    <b>:</b>
                    <div className="  ">{each.job_details.company_name}</div>
                  </div>
                  <div className="flex">
                    <b className=" flex ">Website</b>
                    <b>:</b>
                    <div className="  ">{each.job_details.website}</div>
                  </div>
                  <div className="flex">
                    <b className="  flex ">Date</b>
                    <b>:</b>
                    <div className=" ">{each.createdAt.substring(0, 10)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row w-full">
              {/* 2 */}
              {/* Qualify if the resume gets response */}
              <div className="w-full flex h-full">
                <Button
                  className="w-1/7 bg-red-400"
                  value="rejected"
                  onClick={() => toggleButtonHandler(each._id, "rejected")}
                  style={
                    responseValue === "rejected"
                      ? { background: Colors.RED5 }
                      : { background: Colors.WHITE }
                  }
                >
                  <div>
                    <CloseIcon style={{ fill: "red" }} />
                  </div>
                </Button>

                <Button
                  className="w-1/7 bg-red-400"
                  value="phone"
                  onClick={() => toggleButtonHandler(each._id, "phone")}
                  style={
                    responseValue === "phone"
                      ? { background: Colors.BLUE5 }
                      : { background: Colors.WHITE }
                  }
                >
                  <div>
                    <MdPhone style={{ fill: "black" }} />
                  </div>
                </Button>

                <Button
                  className="w-1/7 bg-red-400"
                  value="first"
                  onClick={() => toggleButtonHandler(each._id, "first")}
                  style={
                    responseValue === "first"
                      ? { background: "#fff9c4" }
                      : { background: Colors.WHITE }
                  }
                >
                  <div>1st</div>
                </Button>

                <Button
                  className="w-1/7 bg-red-400"
                  value="second"
                  onClick={() => toggleButtonHandler(each._id, "second")}
                  style={
                    responseValue === "second"
                      ? { background: "#fff176" }
                      : { background: Colors.WHITE }
                  }
                >
                  <div>2nd</div>
                </Button>

                <Button
                  className="w-1/7 bg-red-400"
                  value="third"
                  onClick={() => toggleButtonHandler(each._id, "third")}
                  style={
                    responseValue === "third"
                      ? { background: "#ffeb3b" }
                      : { background: Colors.WHITE }
                  }
                >
                  <div>3rd</div>
                </Button>

                <Button
                  className="w-1/7 bg-red-400"
                  value="fourth"
                  onClick={() => toggleButtonHandler(each._id, "fourth")}
                  style={
                    responseValue === "fourth"
                      ? { background: "#ffc107" }
                      : { background: Colors.WHITE }
                  }
                >
                  <div>4th</div>
                </Button>

                <Button
                  className="w-1/7 relative h-full"
                  value="offer"
                  onClick={() => toggleButtonHandler(each._id, "offer")}
                  style={
                    responseValue === "offer"
                      ? { background: Colors.GREEN5 }
                      : { background: Colors.WHITE }
                  }
                >
                  <div className=" w-full relative h-full">
                    {responseValue === "offer" && (
                      <ShowOnce
                        mode={"animate__flipInX"}
                        speed={"animate__fast"}
                        delay={"animate__delay-0s"}
                      >
                        <img
                          className=" w-full absolute scale-[1.8]"
                          src={congratulation.src}
                          alt="congratulation"
                        />
                      </ShowOnce>
                    )}
                    <DoneIcon style={{ fill: "green", width: "100%" }} />
                  </div>
                </Button>
              </div>

              {/* 3 */}
              {/* The image and the introduction */}
              <Button
                className=" border-4 flex transition duration-300"
                onClick={() => ClickHandler(each._id)}
              >
                <CustomWidthTooltip
                  title={
                    <div>
                      <div className="border border-green-500 bottom-0 px-2  ">
                        <div className="flex">
                          <b className=" w-1/4 flex group-hover/left:justify-end">
                            Position
                          </b>
                          <b>:</b>
                          <div className=" w-3/4">
                            {each.job_details.job_position}
                          </div>
                        </div>
                        <div className="flex">
                          <b className=" w-1/4 flex group-hover/left:justify-end">
                            Company
                          </b>
                          <b>:</b>
                          <div className="  w-3/4">
                            {each.job_details.company_name}
                          </div>
                        </div>
                        <div className="flex">
                          <b className=" w-1/4 flex group-hover/left:justify-end">
                            Website
                          </b>
                          <b>:</b>
                          <div className=" w-3/4 ">
                            {each.job_details.website}
                          </div>
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
                      <div className="border border-blue-300 relative w-full flex justify-center">
                        <PieChart
                          className="w-1/3"
                          data={[
                            {
                              title: "Un-Matches",
                              value: Number(each?.unmatches.length),
                              color: "#ff869c",
                            },
                            {
                              title: "Matches",
                              value: Number(each?.matches.length),
                              color: "#a7ff78",
                            },
                          ]}
                        />
                        <div className="border text-sm flex justify-center items-center  absolute  w-full h-full">
                          <div className="text-xl font-black text-black">
                            {(
                              (each?.matches.length /
                                (each?.matches.length +
                                  each?.unmatches.length)) *
                              100
                            ).toFixed(2)}
                            %
                          </div>
                        </div>
                      </div>
                      <div className=" font-bold flex justify-center">
                        Matches
                      </div>
                      <div className="break-words">
                        {each.matches?.map((item: string, ind: number) => (
                          <div className="flex " key={"match" + ind}>
                            <div>{ind + 1}: </div>
                            <div className=" ">{item}</div>
                          </div>
                        ))}
                      </div>
                      <div className=" font-bold flex justify-center">
                        Un-Matches
                      </div>
                      <div className="break-words">
                        {each.unmatches?.map((item: string, ind: number) => (
                          <div
                            className="flex break-words"
                            key={"unmatch" + ind}
                          >
                            <div>{ind + 1}: </div>
                            <div>{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                  placement="right"
                  enterDelay={550}
                >
                  <div>Edit</div>
                </CustomWidthTooltip>
              </Button>

              {/* 3 */}
              {/* delete */}
              <div className="h-full ">
                <Button
                  className="w-full bg-red-400 h-full"
                  value="false"
                  onClick={() => deleteHandler(each._id)}
                  // style={
                  //   responseValue === "false"
                  //     ? { background: Colors.RED5 }
                  //     : { background: Colors.WHITE }
                  // }
                >
                  <div className=" text-red-500">Delete</div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
