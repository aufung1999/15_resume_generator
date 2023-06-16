"use client";
import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

import { useSelector, useDispatch } from "react-redux";
import {
  addWorkExp,
  deleteWorkExp,
  editCompanyName,
  editPosition,
  editStartDate,
  editEndDate,
  addrow,
  editJobDescription,
  currentWorking,
  deleterow,
  WorkExpState,
} from "@/slices/workSlice";
import DatePicker from "react-date-picker";
import { RootState } from "@/store/store";

export default function FetchWorkExp() {
  const dispatch = useDispatch();



  return <div>fetchWorkExp</div>;
}
