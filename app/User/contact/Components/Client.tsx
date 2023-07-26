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

import useSWR from "swr";

export default function ContactClient({ data }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const contact = useSelector((state: RootState) => state.contact);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanUp_Contact_redux());
    if (data) {
      dispatch(initialize_ClientData(data));
    }
    //Copy the "initialized" data from the database
    setCopy(contact);
    setRemind(false);
  }, [data]);

  //----------------------------------------------------------------------------------
  const [copyData, setCopy] = useState<any | null>(null);
  const [remind, setRemind] = useState(false);

  //Copy the "initialized" data from the database
  useEffect(() => {
    if (copyData) {
      //if LEFT and RIGHT sides are equal -> no NEED to update data in database
      JSON.stringify(copyData) === JSON.stringify(contact)
        ? setRemind(false)
        : setRemind(true);
    }
  }, [contact]);

  //----------------------------------------------------------------------------------
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

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };
  return (
    <div
      className={`border border-blue-600 flex-1 ${
        remind ? " bg-red-300" : " bg-green-200"
      }`}
    >
      <Toaster />
      <h1>Contact</h1>
      {/* ....................First Name/ Family Name............................ */}
      <div className=" border flex flex-col md:items-center md:justify-center">
        <div className=" grid grid-cols-2 border w-full">
          <FormGroup
            label="First Name"
            labelFor="text-input"
            labelInfo="(required)"
            className="w-full border "
          >
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="given-name"
              onChange={(e) => dispatch(editFirstName(e.target.value))}
              fill={true}
              value={contact.FirstName}
              className="w-full border overflow-hidden"
            />
          </FormGroup>

          <FormGroup
            label="Last Name"
            labelFor="text-input"
            labelInfo="(required)"
            className="w-full border"
          >
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="family-name"
              onChange={(e) => dispatch(editLastName(e.target.value))}
              value={contact.LastName}
              className="w-full border overflow-hidden"
            />
          </FormGroup>
        </div>

        {/* ................................................ */}
        <div className=" w-full md:w-8/12">
          <FormGroup label="Phone" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder=""
              onChange={(e) => dispatch(editPhoneNumber(e.target.value))}
              value={contact.PhoneNumber}
              className="w-full border overflow-hidden"
            />
          </FormGroup>
        </div>
        {/* ..................Country/City.............................. */}
        <div className=" grid grid-cols-2 w-full md:w-8/12">
          <FormGroup
            label="Country"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="country"
              onChange={(e) => dispatch(editCountry(e.target.value))}
              value={contact.Country}
              className="w-full border overflow-hidden"
            />
          </FormGroup>

          <FormGroup label="City" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="shipping locality"
              onChange={(e) => dispatch(editCity(e.target.value))}
              value={contact.City}
              className="w-full border overflow-hidden"
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className="grid grid-cols-2 w-full md:w-8/12">
          <FormGroup label="State" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder=""
              onChange={(e) => dispatch(editState(e.target.value))}
              value={contact.State}
              className="w-full border overflow-hidden"
            />
          </FormGroup>

          <FormGroup
            label="Zip Code"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="shipping postal-code"
              onChange={(e) => dispatch(editZipCode(e.target.value))}
              value={contact.ZipCode}
              className="w-full border overflow-hidden"
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className=" w-full md:w-8/12">
          <FormGroup label="Email" labelFor="Email" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder="abc123@gmail.com"
              onChange={(e) => dispatch(editEmail(e.target.value))}
              value={contact.Email}
              className="w-full border overflow-hidden"
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className=" w-full md:w-8/12">
          <FormGroup
            label="Portfolio"
            labelFor="Portfolio"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              onChange={(e) => dispatch(editPortfolio(e.target.value))}
              value={contact.Portfolio}
              className="w-full border overflow-hidden"
            />
          </FormGroup>
        </div>
        {/* ............*LinkedIn*.................................... */}
        <div className=" w-full md:w-8/12">
          <SocialMedia
            key="LinkedIn"
            urlParam="linkedin"
            DisplayName="LinkedIn"
            labelFor="LinkedIn"
            edit={editLinkedIn}
            SocialMedia={contact.LinkedIn}
          />
        </div>
        {/* ............*GitHub*.................................... */}
        <div className=" w-full md:w-8/12">
          <SocialMedia
            key="GitHub"
            urlParam="github"
            DisplayName="GitHub"
            labelFor="GitHub"
            edit={editGitHub}
            SocialMedia={contact?.GitHub}
          />
        </div>
        {/* ...................(Add more links?)............................. */}
        <div>
          <InsertLink />
        </div>
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </div>
  );
}
