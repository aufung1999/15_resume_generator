import React from "react";
import PersonalInfo from "./Components/PersonalInfo";

export default function page() {
  return (
    <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex border-4">
      {/* h-screen */}
      <div className="w-full h-screen flex flex-row border-2">
        <div className="w-full  border border-red-300">Resume</div>
        <div className="w-full border border-red-300">
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
}
