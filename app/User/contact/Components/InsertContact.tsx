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

export default function InsertContact({
  data,
  dispatched,
}: {
  data: any;
  dispatched: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const contact_redux = useSelector((state: RootState) => state.contact);

  const dispatch = useDispatch();

  const [copyData, setCopy] = useState<any | null>(null);
  const [remind, setRemind] = useState(false);

  //----------------------------------------------------------------------------------
  useEffect(() => {
    console.log("hi");
    if (dispatched) {
      //Copy the "initialized" data from the database
      setRemind(false);
      setCopy(contact_redux);
    }
  }, [data, dispatched]);

  //Copy the "initialized" data from the database
  useEffect(() => {
    console.log(copyData);
    if (copyData) {
      //if LEFT and RIGHT sides are equal -> no NEED to update data in database
      JSON.stringify(copyData) === JSON.stringify(contact_redux)
        ? setRemind(false)
        : setRemind(true);
    }
  }, [contact_redux]);

  //----------------------------------------------------------------------------------
  // Save to server
  const SubmitHandler = () => {
    // console.log(contact);

    fetch("/api/user/contact", {
      method: "POST",
      body: JSON.stringify(contact_redux),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        toast.success("User Contact Info Updated!"),
          setRemind(false),
          setCopy(contact_redux);
        dispatch(cleanUp_Contact_redux());
        dispatch(initialize_ClientData(contact_redux));
      })
      .catch(() => toast.error("Cannot Update!"));

    startTransition(() => {
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
              value={contact_redux.FirstName}
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
              value={contact_redux.LastName}
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
              value={contact_redux.PhoneNumber}
              className="w-full border overflow-hidden"
            />
          </FormGroup>
        </div>
        {/* ..................Country/City.............................. */}
        <div className=" grid grid-cols-2 w-full md:w-8/12">
          <FormGroup
            label="Country"
            labelFor="text-input"
            // labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="country"
              onChange={(e) => dispatch(editCountry(e.target.value))}
              value={contact_redux.Country}
              className="w-full border overflow-hidden"
            />
          </FormGroup>

          <FormGroup label="City" labelFor="text-input" >
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="shipping locality"
              onChange={(e) => dispatch(editCity(e.target.value))}
              value={contact_redux.City}
              className="w-full border overflow-hidden"
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className="grid grid-cols-2 w-full md:w-8/12">
          <FormGroup label="State" labelFor="text-input">
            <InputGroup
              id="text-input"
              placeholder=""
              onChange={(e) => dispatch(editState(e.target.value))}
              value={contact_redux.State}
              className="w-full border overflow-hidden"
            />
          </FormGroup>

          <FormGroup
            label="Zip Code"
            labelFor="text-input"
            // labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="shipping postal-code"
              onChange={(e) => dispatch(editZipCode(e.target.value))}
              value={contact_redux.ZipCode}
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
              value={contact_redux.Email}
              className="w-full border overflow-hidden"
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className=" w-full md:w-8/12">
          <FormGroup
            label="Portfolio"
            labelFor="Portfolio"
            // labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              onChange={(e) => dispatch(editPortfolio(e.target.value))}
              value={contact_redux.Portfolio}
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
            SocialMedia={contact_redux.LinkedIn}
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
            SocialMedia={contact_redux?.GitHub}
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
