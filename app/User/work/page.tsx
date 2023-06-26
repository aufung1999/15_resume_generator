import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import Work from "@/models/Work";
import WorkClient from "./Components/Client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let workData;
  //check if "Authenticated", which means "Logged In?"
  if (session) {
    await db.connect();
    workData = JSON.parse(
      JSON.stringify(
        await Work.find({
          email: session?.user?.email,
        })
      )
    );
    if (workData) {
      workData = workData.map((each: any) => db.convertDocToObj(each));
    }

    return (
      <div>
        <WorkClient data={workData} />
      </div>
    );
  }

  return <div>Please Login</div>;
}
