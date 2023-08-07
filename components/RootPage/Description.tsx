import React from "react";
import Image from "next/image";

import IMG_a_job from "../../public/IMG_a_job.png";
import IMG_keep_editing_resume from "../../public/IMG_keep_editing_resume.png";
import IMG_1_resume from "../../public/IMG_1_resume.png";
import ShowOnce from "@/utils/ShowOnce";

export default function Description() {
  return (
    <div className=" flex border-8 w-full relative">
      <div className=" w-1/3 aspect-video left-10">
        <ShowOnce
          mode={"animate__flipInX"}
          speed={"animate__fast"}
          delay={"animate__delay-0s"}
        >
          <Image
            src={IMG_a_job}
            alt="Picture of the author"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </ShowOnce>
      </div>
      <div className=" w-1/3 aspect-video top-1/2 left-1/2  z-30">
        <ShowOnce
          mode={"animate__flipInX"}
          speed={"animate__fast"}
          delay={"animate__delay-2s"}
        >
          <Image
            src={IMG_keep_editing_resume}
            alt="Picture of the author"
            // width={500}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </ShowOnce>
      </div>
      <div className="  w-1/3 aspect-video  right-8 z-20">
        <ShowOnce
          mode={"animate__flipInX"}
          speed={"animate__fast"}
          delay={"animate__delay-1s"}
        >
          <Image
            src={IMG_1_resume}
            alt="Picture of the author"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            // width={500}
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </ShowOnce>
      </div>
    </div>
  );
}
