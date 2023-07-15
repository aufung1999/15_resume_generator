"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  Icon,
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
  initialize_EducationData,
  cleanUp_Education_redux,
} from "@/slices/educationSlice";
import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

import toast, { Toaster } from "react-hot-toast";

type Props = {
  index: string;
};

const InputComp = ({ index }: Props) => {
  const dispatch = useDispatch();

  const education_redux: EducationState[] = useSelector(
    (state: RootState) => state.education
  );
  const education = education_redux.find((each) => each.index === index);

  return (
    <Card interactive={false} style={{ background: "white", color: "black" }}>
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
        <div className=" flex-col">
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

export default function InsertEducation({ data }: any) {
  const education_redux = useSelector((state: RootState) => state.education);
  const dispatch = useDispatch();

  const [educations, editEducations] = useState<any>([]);

  useEffect(() => {
    dispatch(cleanUp_Education_redux());
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: any) => {
        dispatch(initialize_EducationData(each));
      });
    }
  }, []);

  useEffect(() => {
    let temp_arr: any[] = [];
    if (education_redux.length !== 0) {
      education_redux.map((each) => {
        temp_arr.push(<InputComp key={each.index} index={each.index} />);
      });
      editEducations(temp_arr);
    }
  }, [education_redux]);

  //---------------ADD/DELETE-------------------
  const addEdu = () => {
    //initialize the "index"
    const uuid = uuidv4();
    const short_id = shortenUUID(uuid);
    // update the Redux Store
    dispatch(addEducation({ index: uuid }));
    //update the useState of "educations"
    editEducations(educations.concat(<InputComp key={uuid} index={uuid} />));
  };

  const deleteEdu = async (e: React.ChangeEvent<any>, received: string) => {
    console.log("received: " + received);
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteEducation({ index: received }));
    //update the useState of "educations"
    const after_remove = educations.filter(
      (each: any) => each.props.index !== received
    );
    editEducations(after_remove);
    //delete from the MongoDB
    await fetch(`/api/user/education/delete`, {
      method: "POST",
      body: JSON.stringify(received),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("Deleted!"))
      .catch(() => toast.error("Cannot Delete!"));
  };
  //***/
  return (
    <div className=" border border-red-300 w-full">
      <Toaster />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {educations?.map((each: any, i: number) => (
          <div key={i}>
            <div className=" relative">
              {each}
              <Button
                className="absolute top-0 right-0 "
                style={{
                  backgroundColor: "rgba(255,0,0,0.6)",
                  borderRadius: "25% 10%",
                }}
                onClick={(e) => deleteEdu(e, each.props.index)}
              >
                <Icon icon="delete" className="" style={{ color: "white" }} />
              </Button>
            </div>
          </div>
        ))}
        <Button
          icon={<Icon icon="insert" className="" style={{ color: "white" }} />}
          onClick={addEdu}
          fill
          style={{
            backgroundColor: "rgba(0,120,255,1)",
          }}
        />
      </div>
    </div>
  );
}
