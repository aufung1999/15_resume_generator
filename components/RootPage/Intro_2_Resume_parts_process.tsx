"use client";

import Image from "next/image";
import React from "react";

import Example_Process from "../../public/Example_Process.png";

export default function Intro_2_Resume_parts_process() {
  return (
    <div className=" grid grid-cols-10">
      <div className=" col-span-10 text-lg">
        <div className="text-4xl text-white font-serif font-bold p-2 underline italic">Process</div>
      </div>

      <div className="border col-span-10 text-lg">
        <div className="  w-full aspect-video  right-8 z-20">
          <Image
            src={Example_Process}
            alt="Example_Process"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            // width={500}
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
      </div>
    </div>
  );
}
