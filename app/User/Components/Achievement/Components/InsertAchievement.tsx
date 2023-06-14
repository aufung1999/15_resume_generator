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
} from "@/slices/awardSlice";

type Props = {
  index: number;
};

const InputComp = ({ index }: Props) => {
  const dispatch = useDispatch();

  const award = useSelector((state: RootState) => state.award);
  return (
    <Card interactive style={{ background: "gray", color: "white" }}>
      <h3>Company {index}</h3>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        Award Name:
        <InputGroup
          onChange={(e) =>
            dispatch(
              editAwardName({ index: index, AwardName: e.target.value })
            )
          }
        />
        Award by:{" "}
        <InputGroup
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
            value={award[index].Date || null}
          />
        </div>
        Award Description:{" "}
        <div className="w-full">
          <TextArea
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
  const [links, insertLinks] = useState<any>([]);

  const addLink = () => {
    dispatch(addAward({ index: links.length }));
    insertLinks(
      links.concat(<InputComp key={links.length} index={links.length} />)
    );
  };
  return (
    <div>
      <Button icon="insert" onClick={addLink} />
      {links?.map((each: any, index: number) => (
        <div key={index}>{each}</div>
      ))}
    </div>
  );
}
