import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import ObjectiveClient from "./Components/Client";
import Objective from "@/models/Objective";

export default async function Page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let objectiveData;
  //check if "Authenticated", which means "Logged In?"
  if (session) {
    await db.connect();
    objectiveData = await Objective.find({
      email: session?.user?.email,
    });
    if (objectiveData) {
      // objectiveData = objectiveData.map((each) => db.convertDocToObj(each));
      objectiveData = JSON.parse(JSON.stringify(objectiveData));
    }
  }
  return (
    <div>
      <ObjectiveClient data={objectiveData} />
    </div>
  );
}
