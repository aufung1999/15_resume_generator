import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import db from "@/utils/db";
import Resume from "@/models/Resume";

import UserClient from "./Components/Client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  let resumeData;

  if (session) {
    await db.connect();
    resumeData = JSON.parse(
      JSON.stringify(
        await Resume.find({
          email: session?.user?.email,
        })
      )
    );
    if (resumeData) {
      resumeData.map((each) => db.convertDocToObj(each));
    }
  }

  return (
    <div className=" w-full items-center justify-between font-mono text-sm lg:flex border-4">
      {/* h-screen */}
      <div className="w-full flex flex-row border-2">
        <UserClient resumeData={resumeData} />
      </div>
    </div>
  );
}
