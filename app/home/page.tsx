"use client";
import React from 'react'

import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import Contact from "@/models/Contact";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  editFirstName,
  editLastName,
  editPhoneNumber,
  editCountry,
  editCity,
  editState,
  editZipCode,
  editEmail,
  editPortfolio,
  editLinkedIn,
  editGitHub,
  ContactState,
} from "@/slices/contactSlice";

export default function page() {
    const session = await getServerSession(authOptions);
    const dispatch = useDispatch();

    //Initialize a variable outside of "if" statement
    let contactData: any;
    //check if "Authenticated"
    if (session) {
      await db.connect();
      contactData = await Contact.findOne({
        email: session?.user?.email,
      });
      if (contactData) {
        contactData = db.convertDocToObj(contactData);
        dispatch(editEmail(contactData?.Email));
        dispatch(editFirstName(contactData?.FirstName));
        dispatch(editLastName(contactData?.LastName));
        dispatch(editPhoneNumber(contactData?.PhoneNumber));
        dispatch(editCountry(contactData?.Country));
        dispatch(editCity(contactData?.City));
        dispatch(editState(contactData?.State));
        dispatch(editZipCode(contactData?.ZipCode));
        dispatch(editPortfolio(contactData?.Portfolio));
        dispatch(editLinkedIn(contactData?.LinkedIn));
        dispatch(editGitHub(contactData?.GitHub));
      }
    }
  return (
    <div>page</div>
  )
}
