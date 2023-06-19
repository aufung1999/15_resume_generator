"use client";
import React, { useEffect, useState } from "react";
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
  EducationState,
  deleteEducation,
} from "@/slices/educationSlice";
import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

import useSWR from "swr";

type Props = {
  index: string;
};

const InputComp = ({ index }: Props) => {
  const dispatch = useDispatch();

  const educations: EducationState[] = useSelector(
    (state: RootState) => state.education
  );
  const education = educations.find((each) => each.index === index);

  return (
    <Card interactive={false} style={{ background: "gray", color: "white" }}>
      <h3>Education {index}</h3>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        School Name:
        <InputGroup
          value={education ? education?.SchoolName : ""}
          onChange={(e) =>
            dispatch(
              editSchoolName({ index: index, SchoolName: e.target.value })
            )
          }
        />
        Degree:{" "}
        <InputGroup
          value={education ? education?.Degree : ""}
          onChange={(e) =>
            dispatch(editDegree({ index: index, Degree: e.target.value }))
          }
        />
        Subject:{" "}
        <InputGroup
          value={education ? education?.Subject : ""}
          onChange={(e) =>
            dispatch(editSubject({ index: index, Subject: e.target.value }))
          }
        />
        {/* ---------------------------Time Related-------------------------- */}
        <Switch
          checked={education?.current}
          onChange={(value) =>
            education?.current
              ? dispatch(
                  currentStudying({
                    index: index,
                    current: !education.current,
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
              value={education?.StartDate ? education.StartDate : null}
            />
          </div>
          End Date:
          <div className=" text-black">
            <DatePicker
              onChange={(value) =>
                dispatch(editEndDate({ index: index, EndDate: value }))
              }
              value={education?.EndDate ? education.EndDate : null}
              disabled={education?.current ? education.current : false}
            />
          </div>
        </div>
        {/* ---------------------------Time Related-------------------------- */}
      </FormGroup>
    </Card>
  );
};

export default function InsertEducation() {
  const dispatch = useDispatch();

  const [educations, editEducations] = useState<any>([]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/user/education", fetcher);

  //fetch data from the collection of "educations" from Database at the initial stage
  useEffect(() => {
    const getData = () => {
      data?.map((each: EducationState) => {
        //---After receive data from MongoDB, dispatch to Redux
        dispatch(addEducation({ index: each.index }));
        dispatch(
          editSchoolName({ index: each.index, SchoolName: each.SchoolName })
        );
        dispatch(editDegree({ index: each.index, Degree: each.Degree }));
        dispatch(editSubject({ index: each.index, Subject: each.Subject }));
        dispatch(
          currentStudying({
            index: each.index,
            current: each.current === undefined ? false : each.current,
          })
        );
        dispatch(
          editStartDate({ index: each.index, StartDate: each.StartDate })
        );
        dispatch(editEndDate({ index: each.index, EndDate: each.EndDate }));

        //this is the part where it Generate the Fetched data from MongoDB to Frontend
        editEducations(
          educations.concat(
            <InputComp key={educations.length} index={each.index} />
          )
        );
      });
    };
    getData();
  }, [data]);

  //---------------ADD/DELETE-------------------
  const addEdu = () => {
    //initialize the "index"
    const uuid = uuidv4();
    const short_id = shortenUUID(uuid);
    // update the Redux Store
    dispatch(addEducation({ index: short_id }));
    //update the useState of "educations"
    editEducations(
      educations.concat(<InputComp key={short_id} index={short_id} />)
    );
  };

  const deleteEdu = (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteEducation({ index: received }));
    //update the useState of "educations"
    const after_remove = educations.filter(
      (each: any) => each.props.index !== received
    );
    editEducations(after_remove);
  };
  //***/
  return (
    <div>
      <Button icon="insert" onClick={addEdu} />
      {educations?.map((each: any, i: number) => (
        <div key={i}>
          <Button
            icon="delete"
            onClick={(e) => deleteEdu(e, each.props.index)}
          />
          {each}
        </div>
      ))}
    </div>
  );
}
