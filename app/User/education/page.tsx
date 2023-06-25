import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import EducationClient from "./Components/Client";
import Education from "@/models/Education";

export default async function Page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let educationData;
  //check if "Authenticated", which means "Logged In?"
  if (session) {
    await db.connect();
    educationData = JSON.parse(
      JSON.stringify(
        await Education.find({
          email: session?.user?.email,
        })
      )
    );
    if (educationData) {
      educationData = educationData.map((each: any) =>
        db.convertDocToObj(each)
      );
    }
  }

  return (
    <div>
      <EducationClient data={educationData} />
    </div>
  );
}
