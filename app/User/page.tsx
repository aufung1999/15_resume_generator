// "use client"
import PersonalInfo from "./Components/PersonalInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  // const router = useRouter();
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     // The user is not authenticated, handle it here.
  //     router.push("./login");
  //   },
  // });

  return (
    <div className=" w-full items-center justify-between font-mono text-sm lg:flex border-4">
      {/* h-screen */}
      <div className="w-full flex flex-row border-2">
        <div className="w-full  border border-red-300">Resume</div>
        <div className="w-full border border-red-300">
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
}
