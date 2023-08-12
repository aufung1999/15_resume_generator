import React, { Suspense } from "react";
import Loading from "./loading";

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex relative">
      <Suspense fallback={<Loading />}>{children}</Suspense>
 
    </div>
  );
}
