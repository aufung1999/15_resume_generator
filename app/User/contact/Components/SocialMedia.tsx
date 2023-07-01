"use client";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

type Props = {
  urlParam: string;
  DisplayName: string;
  labelFor: string;
  edit: Function;
  SocialMedia: string;
};

export default function SocialMedia({
  urlParam,
  DisplayName,
  labelFor,
  edit,
  SocialMedia,
}: Props) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-row">
        <SocialIcon
          className="me-1"
          url={"https://" + urlParam + ".com/in/jaketrent"}
          style={{ height: 25, width: 20 }}
        />
        <div>{DisplayName}</div>
      </div>
      <FormGroup labelFor={labelFor} labelInfo="(required)">
        <InputGroup
          id="text-input"
          onChange={(e) => dispatch(edit(e.target.value))}
          value={SocialMedia}
          className="w-full border overflow-hidden"
        />
      </FormGroup>
    </>
  );
}
