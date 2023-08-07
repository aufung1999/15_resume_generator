"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

type Props = {
  index: string;
};

const InputComp = ({ index }: Props) => {
  return <input placeholder={"Your input here" + index} />;
};

export default function InsertLink() {
  const [links, insertLinks] = useState<any>([]);

  const addLink = (event: React.ChangeEvent<any>) => {
    insertLinks(
      links.concat(<InputComp key={links.length} index={links.length} />)
    );
  };
  return (
    <div>
      <Button icon="insert" onClick={addLink}></Button>
      {links?.map((each: any, i: number) => (
        <div key={i}>{each}</div>
      ))}
    </div>
  );
}
