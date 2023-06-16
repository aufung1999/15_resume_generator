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

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/user/work", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      console.log(res);
      const receivedata = await res.json();
      console.log("data: " + JSON.stringify(receivedata, null, 1));

      receivedata.map((each: WorkExpState) => {
        //---After receive data from MongoDB, dispatch to Redux
        dispatch(addWorkExp({ index: each.index }));
        dispatch(
          editCompanyName({ index: each.index, CompanyName: each.CompanyName })
        );
        dispatch(editPosition({ index: each.index, Position: each.Position }));
        dispatch(
          editStartDate({ index: each.index, StartDate: each.StartDate })
        );
        dispatch(editEndDate({ index: each.index, EndDate: each.EndDate }));
        dispatch(
          currentWorking({
            index: each.index,
            current: each?.current ? each?.current : false,
          })
        );
        each.JobDescription.map((row) => {
          dispatch(addrow({ index: each.index, rowIndex: row.rowIndex }));
          dispatch(
            editJobDescription({
              index: each.index,
              rowIndex: row.rowIndex,
              Row: row.Row,
            })
          );
        });
        //   dispatch(editZipCode(receivedata.ZipCode));
        //   dispatch(editPortfolio(receivedata.Portfolio));
        //   dispatch(editLinkedIn(receivedata.LinkedIn));
        //   dispatch(editGitHub(receivedata.GitHub));
      });
    };
    getData();
  }, []);

  return <div>fetchWorkExp</div>;
}
