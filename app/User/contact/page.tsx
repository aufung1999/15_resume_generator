// "use client";
// import React, { useEffect, useState } from "react";

// import {
//   Button,
//   Card,
//   Elevation,
//   FormGroup,
//   InputGroup,
// } from "@blueprintjs/core";

// import InsertLink from "./Components/InsertLink";
// import SocialMedia from "./Components/SocialMedia";

// import { useSelector, useDispatch } from "react-redux";
// import {
//   editFirstName,
//   editLastName,
//   editPhoneNumber,
//   editCountry,
//   editCity,
//   editState,
//   editZipCode,
//   editEmail,
//   editPortfolio,
//   editLinkedIn,
//   editGitHub,
// } from "@/slices/contactSlice";
// import type { RootState } from "@/store/store";

// import toast, { Toaster } from "react-hot-toast";

// import useSWR from "swr";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import Contact from "@/models/Contact";
import ContactClient from "./Components/Client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let contactData;
  //check if "Authenticated"
  if (session) {
    await db.connect();
    contactData = await Contact.findOne({
      email: "admin@example.com",
    });
  }

  return (
    <div>
      <ContactClient data={contactData} />
    </div>
  );
}
