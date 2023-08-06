import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import Award from "@/models/Award";
import AwardClient from "./Components/Client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let awardData;
  //check if "Authenticated", which means "Logged In?"
  if (session) {
    await db.connect();
    awardData = JSON.parse(
      JSON.stringify(
        await Award.find({
          email: session?.user?.email,
        })
      )
    );

    if (awardData) {
      // awardData = awardData.map((each:any) => db.convertDocToObj(each));
      awardData = JSON.parse(JSON.stringify(awardData));
    }
  }
  return (
    <div >
      <AwardClient data={awardData} />
    </div>
  );
}
