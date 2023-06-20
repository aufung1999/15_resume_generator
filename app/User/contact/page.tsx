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
  console.log("session: " + JSON.stringify(session, null, 1));

  let contactData;
  if (session) {
    await db.connect();
    contactData = await Contact.findOne({
      email: "admin@example.com",
    });
  }
  /*
  const contact = useSelector((state: RootState) => state.contact);
  const dispatch = useDispatch();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/user/contact", fetcher);

  useEffect(() => {
    const getData = () => {


      //---After receive data from MongoDB, dispatch to Redux
      dispatch(editEmail(data?.Email));
      dispatch(editFirstName(data?.FirstName));
      dispatch(editLastName(data?.LastName));
      dispatch(editPhoneNumber(data?.PhoneNumber));
      dispatch(editCountry(data?.Country));
      dispatch(editCity(data?.City));
      dispatch(editState(data?.State));
      dispatch(editZipCode(data?.ZipCode));
      dispatch(editPortfolio(data?.Portfolio));
      dispatch(editLinkedIn(data?.LinkedIn));
      dispatch(editGitHub(data?.GitHub));
    };
    getData();
  }, [data]);

  // Save to server
  const SubmitHandler = () => {
    // console.log(contact);

    fetch("/api/user/contact", {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Contact Info Updated!"))
      .catch(() => toast.error("Cannot Update!"));
  };
*/
  return (
    <div>
      <ContactClient data={contactData} />
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps<any> = async () => {
//   const session = await getServerSession(authOptions);
//   // console.log("session: " + JSON.stringify(session, null, 1));
//   try {
//     await db.connect();
//     const exist = await Contact.find({
//       email: "admin@example.com",
//     });
//     // await db.disconnect();
//     return {
//       props: { exist: "hello" },
//     };
//   } catch (e) {
//     console.error(e);
//   }
// };
