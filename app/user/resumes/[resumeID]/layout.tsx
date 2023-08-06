import Link from "next/link";
import { Suspense } from "react";
import Loading from "../../loading";
export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex flex-col border-8 border-yellow-300">
      <div className=" w-full">{children}</div>
    </div>
  );
}
