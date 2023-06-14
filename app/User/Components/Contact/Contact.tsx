"use client";
import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

import InsertLink from "./Components/InsertLink";
import SocialMedia from "./Components/SocialMedia";

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
} from "@/slices/contactSlice";
import type { RootState } from "@/store/store";

import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const contact = useSelector((state: RootState) => state.contact);
  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/user/contact", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      console.log(res);
      const receivedata = await res.json();
      console.log("data: " + JSON.stringify(data, null, 1));

      //---After receive data from MongoDB, dispatch to Redux
      dispatch(editEmail(receivedata.Email));
      dispatch(editFirstName(receivedata.FirstName));
      dispatch(editLastName(receivedata.LastName));
      dispatch(editPhoneNumber(receivedata.PhoneNumber));
      dispatch(editCountry(receivedata.Country));
      dispatch(editCity(receivedata.City));
      dispatch(editState(receivedata.State));
      dispatch(editZipCode(receivedata.ZipCode));
      dispatch(editPortfolio(receivedata.Portfolio));
      dispatch(editLinkedIn(receivedata.LinkedIn));
      dispatch(editGitHub(receivedata.GitHub));
    };
    getData();
  }, []);

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
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={true}
      elevation={Elevation.TWO}
    >
      <Toaster />
      <h1>Contact</h1>
      {/* ....................First Name/ Family Name............................ */}
      <div className=" border-4 flex flex-col items-center justify-center">
        <div className=" flex flex-row justify-between border w-8/12">
          <FormGroup
            label="First Name"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="given-name"
              onChange={(e) => dispatch(editFirstName(e.target.value))}
              value={contact.FirstName}
            />
          </FormGroup>

          <FormGroup
            label="Last Name"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="family-name"
              onChange={(e) => dispatch(editLastName(e.target.value))}
              value={contact.LastName}
            />
          </FormGroup>
        </div>

        {/* ................................................ */}
        <div className=" w-8/12">
          <FormGroup label="Phone" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder=""
              onChange={(e) => dispatch(editPhoneNumber(e.target.value))}
              value={contact.PhoneNumber}
            />
          </FormGroup>
        </div>
        {/* ..................Country/City.............................. */}
        <div className=" flex flex-row justify-between w-8/12">
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
            />
          </FormGroup>

          <FormGroup label="City" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="shipping locality"
              onChange={(e) => dispatch(editCity(e.target.value))}
              value={contact.City}
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className=" flex flex-row justify-between w-8/12">
          <FormGroup label="State" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder=""
              onChange={(e) => dispatch(editState(e.target.value))}
              value={contact.State}
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
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className=" w-8/12">
          <FormGroup label="Email" labelFor="Email" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder="abc123@gmail.com"
              onChange={(e) => dispatch(editEmail(e.target.value))}
              value={contact.Email}
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className=" w-8/12">
          <FormGroup
            label="Portfolio"
            labelFor="Portfolio"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              onChange={(e) => dispatch(editPortfolio(e.target.value))}
              value={contact.Portfolio}
            />
          </FormGroup>
        </div>
        {/* ............*LinkedIn*.................................... */}
        <div className=" w-8/12">
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
        <div className=" w-8/12">
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
        <InsertLink />
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </Card>
  );
}
