"use client";
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

import InsertLink from "./Components/InsertLink";

export default function Contact() {
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={true}
      elevation={Elevation.TWO}
    >
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
            />
          </FormGroup>
        </div>

        {/* ................................................ */}
        <div className=" w-8/12">
          <FormGroup label="Phone" labelFor="text-input" labelInfo="(required)">
            <InputGroup id="text-input" placeholder="" />
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
              autoComplete="given-name"
            />
          </FormGroup>

          <FormGroup label="City" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="family-name"
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className=" flex flex-row justify-between w-8/12">
          <FormGroup label="State" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              id="text-input"
              placeholder=""
              autoComplete="given-name"
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
              autoComplete="family-name"
            />
          </FormGroup>
        </div>
        {/* ................................................ */}
        <div className=" w-8/12">
          <FormGroup label="Email" labelFor="text-input" labelInfo="(required)">
            <InputGroup id="text-input" placeholder="abc123@gmail.com" />
          </FormGroup>
        </div>
        {/* ...................(Add more links?)............................. */}
        <InsertLink />
      </div>
      <Button className="bp3-intent-primary">Submit</Button>
    </Card>
  );
}
