import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" flex flex-col border-2 border-yellow-300">
      <Suspense fallback={<Loading />}>
        <div className=" w-full">{children}</div>
      </Suspense>
    </section>
  );
}
