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
import { useSelector, useDispatch } from "react-redux";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { RootState } from "../../../store/store";
import {
  addAward,
  editAwardName,
  editAwardBy,
  editDate,
  editAwardDescription,
  AwardState,
  deleteAward,
  initialize_AwardData,
  cleanUp_Award_redux,
} from "@/slices/awardSlice";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

import toast, { Toaster } from "react-hot-toast";

type Props = {
  index: string;
};

const InputComp = ({ index }: Props) => {
  const dispatch = useDispatch();

  const awards: AwardState[] = useSelector((state: RootState) => state.award);
  const award = awards.find((each) => each.index === index);

  return (
    <Card interactive={false} style={{ background: "gray", color: "white" }}>
      <h3>Award {index}</h3>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        Award Name:
        <InputGroup
          value={award ? award?.AwardName : ""}
          onChange={(e) =>
            dispatch(editAwardName({ index: index, AwardName: e.target.value }))
          }
        />
        Award by:{" "}
        <InputGroup
          value={award ? award?.AwardBy : ""}
          onChange={(e) =>
            dispatch(editAwardBy({ index: index, AwardBy: e.target.value }))
          }
        />
        Date:{" "}
        <div className=" text-black">
          <DatePicker
            onChange={(value) =>
              dispatch(editDate({ index: index, Date: value }))
            }
            value={award?.Date ? award?.Date : null}
          />
        </div>
        Award Description:{" "}
        <div className="w-full">
          <TextArea
            value={award ? award?.AwardDescription : ""}
            large={true}
            style={{ width: "100%", height: 100 }}
            fill={true}
            onChange={(e) =>
              dispatch(
                editAwardDescription({
                  index: index,
                  AwardDescription: e.target.value,
                })
              )
            }
            // value={textContent}
          />
        </div>
      </FormGroup>
    </Card>
  );
};

export default function InsertAchievement({ data }: any) {
  const award = useSelector((state: RootState) => state.award);
  const dispatch = useDispatch();

  const [awards, editAwards] = useState<any>([]);

  useEffect(() => {
    dispatch(cleanUp_Award_redux());
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: any) => {
        dispatch(initialize_AwardData(each));
      });
    }
  }, []);

  useEffect(() => {
    let temp_arr: any[] = [];
    if (award.length !== 0) {
      award.map((each: any) => {
        temp_arr.push(<InputComp key={each.index} index={each.index} />);
      });
      editAwards(temp_arr);
    }
  }, [award]);

  //---------------ADD/DELETE-------------------
  const addAwa = () => {
    //initialize the "index"
    const uuid = uuidv4();
    const short_id = shortenUUID(uuid);
    // update the Redux Store
    dispatch(addAward({ index: short_id }));
    //update the useState of "workExps"
    editAwards(awards.concat(<InputComp key={short_id} index={short_id} />));
  };

  const deleteAwa = async (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteAward({ index: received }));
    //update the useState of "educations"
    const after_remove = awards.filter(
      (each: any) => each.props.index !== received
    );
    editAwards(after_remove);
    //delete from the MongoDB
    await fetch(`/api/user/award/delete`, {
      method: "POST",
      body: JSON.stringify(received),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("Deleted!"))
      .catch(() => toast.error("Cannot Delete!"));
  };
  /***/
  return (
    <div className=" border border-red-300 w-full">
      <Toaster />
      <Button icon="insert" onClick={addAwa} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {awards?.map((each: any, i: number) => (
          <div key={i}>
            <Button
              icon="delete"
              onClick={(e) => deleteAwa(e, each.props.index)}
            />
            {each}
          </div>
        ))}
      </div>
    </div>
  );
}
