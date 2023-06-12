"use client"
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

export default function PersonalInfo() {
  return (
    <div className="app">
      <Card interactive={true} elevation={Elevation.TWO}>
        <h1>Book Info Form</h1>
        <FormGroup
          label="Book Title"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup id="text-input" placeholder="Title" />
        </FormGroup>
        <FormGroup label="Author" labelFor="text-input" labelInfo="(required)">
          <InputGroup id="text-input" placeholder="Author name" />
        </FormGroup>
        <FormGroup
          label="Publication Year"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup id="text-input" placeholder="Year" />
        </FormGroup>
        <FormGroup
          label="Image URL"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup id="text-input" placeholder="URL" />
        </FormGroup>
        <Button className="bp3-intent-primary">Submit</Button>
      </Card>
    </div>
  );
}
