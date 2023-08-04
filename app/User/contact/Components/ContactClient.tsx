"use client";
import React, { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

import InsertLink from "./InsertLink";
import SocialMedia from "./SocialMedia";

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
  initialize_ClientData,
  cleanUp_Contact_redux,
} from "@/slices/contactSlice";
import type { RootState } from "@/store/store";

import toast, { Toaster } from "react-hot-toast";

import InsertContact from "./InsertContact";

export default function ContactClient({ data }: { data: any }) {
  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    dispatch(cleanUp_Contact_redux());
    if (data) {
      dispatch(initialize_ClientData(data));
      setDispatched(true)
    }
  }, [data]);

  return (
    <div>
      <InsertContact data={data} dispatched={dispatched} />
    </div>
  );
}
