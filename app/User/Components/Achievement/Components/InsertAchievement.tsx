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
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-date-picker";
import { RootState } from "@/store/store";
import {
  addAward,
  editAwardName,
  editAwardBy,
  editDate,
  editAwardDescription,
  AwardState,
  deleteAward,
} from "@/slices/awardSlice";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

type Props = {
  index: string;
};

const InputComp = ({ index }: Props) => {
  const dispatch = useDispatch();

  const awards:AwardState[] = useSelector((state: RootState) => state.award);
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

export default function InsertAchievement() {
  const dispatch = useDispatch();

  const [awards, editAwards] = useState<any>([]);

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

  const deleteAwa = (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteAward({ index: received }));
    //update the useState of "educations"
    const after_remove = awards.filter(
      (each: any) => each.props.index !== received
    );
    editAwards(after_remove);
  };
  /***/
  return (
    <div>
      <Button icon="insert" onClick={addAwa} />
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
  );
}
