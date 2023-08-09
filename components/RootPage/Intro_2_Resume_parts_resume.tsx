"use client";

import ShowMany from "@/utils/ShowMany";
import { Icon } from "@blueprintjs/core";
import React from "react";

import resume_image from "../../public/resume_image.png";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import Image from "next/image";
import { Card } from "@mui/material";

export default function Intro_2_Resume_parts_resume() {
  return (
    <div className=" relative h-full w-full ">
      {/* <ContentCopyOutlinedIcon
      className=" absolute"
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
    /> */}
      {/* responsive */}
      <div className="border-b-4 mb-3">
        <ShowMany
          mode_IN={"animate__fadeInDown"}
          mode_OUT={"animate__zoomOutDown"}
          speed={"animate__fast"}
          delay={"animate__delay-0s"}
        >
          <span className="sm:text-base md:text-xl lg:text-2xl">
            <span className="font-semibold  italic">Technical Skills</span>
          </span>
        </ShowMany>
      </div>
      <div className="border-b-4  mb-3">
        <ShowMany
          mode_IN={"animate__fadeInDown"}
          mode_OUT={"animate__zoomOutDown"}
          speed={"animate__fast"}
          delay={"animate__delay-1s"}
        >
          <span className="sm:text-base md:text-xl lg:text-2xl">
            <span className="font-semibold  italic">Working Exp.</span>
          </span>
        </ShowMany>
      </div>
      <div className="border-b-4  mb-3">
        <ShowMany
          mode_IN={"animate__fadeInDown"}
          mode_OUT={"animate__zoomOutDown"}
          speed={"animate__fast"}
          delay={"animate__delay-2s"}
        >
          <span className="sm:text-base md:text-xl lg:text-2xl">
            <span className="font-semibold italic">Projects</span>
          </span>
        </ShowMany>
      </div>
    </div>
  );
}
