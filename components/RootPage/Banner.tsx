import React from "react";

export default function Banner() {
  return (
    <div className=" bg-[#102C57]">
      <div className=" grid grid-cols-10">
        <div className=" col-span-10 px-32 py-20">
          <span className="text-4xl text-white font-serif font-bold">
            Why I&apos;m a fit to this position, but still received rejection
            letter?
          </span>
        </div>
        {/* <div className=" col-span-4" /> */}

        {/* <div className=" col-span-4" />

        <div className="border col-span-6 text-lg">
          <div>Yeah, I can hear you! me too!</div>
          <div>
            After ~150 applications on ndeed/LinkedIn/GlassDoor and other
            methods, I am still like you.
          </div>
        </div> */}
      </div>
    </div>
  );
}
