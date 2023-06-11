"use client";

import { useSession, signOut } from "next-auth/react";

export default function ClientComponent() {
  const { data: session, status } = useSession();

  // const token = await getToken({ req, secret })
  return (
    <div className="w-8/12 flex flex-col justify-center border-8 no-wrap">
      <div className=" flex flex-col justify-center border flex-wrap">
        {JSON.stringify(session)}
      </div>
      <div className=" border-8">{JSON.stringify(session?.user, null, 1)}</div>
      {/* {console.log(JSON.stringify(session?.user._doc.address, null, 1))} */}
      <div className=" w-full flex justify-center">{status}</div>
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  );
}
