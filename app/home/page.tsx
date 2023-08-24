import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let contactData: any;
  //check if "Authenticated"
  if (session) {
  }
  return <div>page</div>;
}
