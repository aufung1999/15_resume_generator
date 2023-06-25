import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import Work from "@/models/Work";

import ProjectClient from "./Components/Client";
import Project from "@/models/Project";

export default async function Page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let projectData;
  //check if "Authenticated", which means "Logged In?"
  if (session) {
    await db.connect();
    projectData = JSON.parse(
      JSON.stringify(
        await Project.find({
          email: session?.user?.email,
        })
      )
    );
    if (projectData) {
      projectData = projectData.map((each: any) => db.convertDocToObj(each));
    }
  }

  return (
    <div>
      <ProjectClient data={projectData} />
    </div>
  );
}
