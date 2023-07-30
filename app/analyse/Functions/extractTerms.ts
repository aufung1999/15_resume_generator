import React from "react";

export default function extractTerms(input: any, mode: string) {
  let splited_input, cleaned_input;
  switch (mode) {
    case "project_redux":
      splited_input = input.split(",");

      cleaned_input = splited_input.map((each: any) =>
        each.replace(/[^A-Za-z0-9/]/g, "")
      );

      return cleaned_input;
    case "input":
      splited_input = input.split(" ");

      cleaned_input = splited_input.map((each: any) =>
        each.replace(/[^A-Za-z0-9/]/g, "")
      );

      return cleaned_input;
    case "cleanup":
      cleaned_input = input.replace(/[^A-Za-z/]/g, "");

      return cleaned_input;
    case "search":
      splited_input = input.split(/[/\s_]+/);

      cleaned_input = splited_input.map((each: any) =>
        each.replace(/[^A-Za-z0-9/]/g, "").toLowerCase()
      );

      return cleaned_input;
  }
}
