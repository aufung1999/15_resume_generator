import React from "react";

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex relative">
      {children}
      {/* <div className="relative">
        <div className="absolute">hi</div>
      </div> */}
    </div>
  );
}
