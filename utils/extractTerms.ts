import React from "react";

export default function extractTerms(input: any) {
  const splited_input = input.split(",");

  const cleaned_input = splited_input.map((each: any) =>
    each.replace(/[^A-Za-z0-9]/g, "")
  );

  return cleaned_input;
}
