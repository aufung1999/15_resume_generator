"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Switch,
  TextArea,
} from "@blueprintjs/core";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { useSelector, useDispatch } from "react-redux";
import {
  addEducation,
  editSchoolName,
  editDegree,
  editSubject,
  editStartDate,
  editEndDate,
  currentStudying,
} from "@/slices/educationSlice";
import { RootState } from "@/store/store";

const InputComp = ({ index }) => {
  const dispatch = useDispatch();

  const education = useSelector((state: RootState) => state.education);

  //---test---
  if (education.length !== 0) {
    console.log(education);
    console.log(education[index].StartDate);
  }

  const [current, setCurrent] = useState(false);
  const [startDate, changeStartDate] = useState(new Date());
  const [endDate, changeEndDate] = useState();

  return (
    <Card interactive={false} style={{ background: "gray", color: "white" }}>
      <h3>Education {index}</h3>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        School Name:
        <InputGroup
          onChange={(e) =>
            dispatch(
              editSchoolName({ index: index, SchoolName: e.target.value })
            )
          }
        />
        Degree:{" "}
        <InputGroup
          onChange={(e) =>
            dispatch(editDegree({ index: index, Degree: e.target.value }))
          }
        />
        Subject:{" "}
        <InputGroup
          onChange={(e) =>
            dispatch(editSubject({ index: index, Subject: e.target.value }))
          }
        />
        <Switch
          onChange={(value) =>
            education[index].current
              ? dispatch(
                  currentStudying({
                    index: index,
                    current: !education[index].current,
                  })
                )
              : dispatch(currentStudying({ index: index, current: true }))
          }
          label=" Currently Studying"
        />
        <div className=" flex">
          Start Date:{" "}
          <div className=" text-black">
            <DatePicker
              onChange={(value) =>
                dispatch(editStartDate({ index: index, StartDate: value }))
              }
              value={education[index].StartDate || null}
            />
          </div>
          End Date:
          <div className=" text-black">
            <DatePicker
              onChange={(value) =>
                dispatch(editEndDate({ index: index, EndDate: value }))
              }
              value={education[index].EndDate || null}
              disabled={education[index].current}
            />
          </div>
        </div>
      </FormGroup>
    </Card>
  );
};

export default function InsertEducation() {
  const dispatch = useDispatch();
  const [links, insertLinks] = useState([]);

  const addLink = (event) => {
    dispatch(addEducation({ index: links.length }));
    insertLinks(
      (links as []).concat(
        <InputComp key={links.length} index={links.length} />
      )
    );
  };
  return (
    <div>
      <Button icon="insert" onClick={addLink} />
      {links?.map((each, index) => (
        <div key={index}>{each}</div>
      ))}
    </div>
  );
}
