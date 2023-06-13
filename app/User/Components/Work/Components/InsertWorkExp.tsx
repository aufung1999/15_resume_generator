"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

const InputComp = ({ index }) => {
  return <input placeholder={"Your input here" + index} />;
};

export default function InsertWorkExp() {
  const [links, insertLinks] = useState([]);

  const addLink = (event) => {
    insertLinks(
      (links as []).concat(
        <InputComp key={links.length} index={links.length} />
      )
    );
  };
  return (
    <div>
      <Button icon="insert" onClick={addLink}></Button>
      {links?.map((each, index) => (
        <div key={index}>{each}</div>
      ))}
    </div>
  );
}
