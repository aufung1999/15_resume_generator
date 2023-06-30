import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ResumeClient from "./Components/Client";
import EditResume from "./Components/Edit";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <div className="flex w-full">
        <div className=" basis-[30%]">
          <EditResume />
        </div>
        <div className=" basis-[70%]">
          <ResumeClient />
        </div>
      </div>
    );
  }
  return <div>go Login</div>;
}
