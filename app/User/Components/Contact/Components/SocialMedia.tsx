import React from "react";
import { SocialIcon } from "react-social-icons";
import {
    Button,
    Card,
    Elevation,
    FormGroup,
    InputGroup,
  } from "@blueprintjs/core";

export default function SocialMedia({urlParam, DisplayName, labelFor}) {
  return (
    <>
      <div className="flex flex-row">
        <SocialIcon
          className="me-1"
          url={"https://"+urlParam+".com/in/jaketrent"}
          style={{ height: 25, width: 20 }}
        />
        <div>{DisplayName}</div>
      </div>
      <FormGroup labelFor={labelFor} labelInfo="(required)">
        <InputGroup id="text-input" />
      </FormGroup>
    </>
  );
}
