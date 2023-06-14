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
import {
  addWorkExp,
  editCompanyName,
  editPosition,
  editStartDate,
  editEndDate,
  addrow,
  editJobDescription,
  currentWorking,
} from "@/slices/workSlice";
import DatePicker from "react-date-picker";
import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

type Props = {
  index: string;
};
type rowProps = {
  rowIndex: string;
};

interface workType {
  index: string;
  CompanyName: string;
  Position: string;
  current: boolean;
  StartDate: string;
  EndDate: string;
  JobDescription: { rowIndex: string; Row: string }[];
}

const RowComp = ({ rowIndex }: rowProps) => {
  return <div>hi</div>;
};

const InputComp = ({ index }: Props) => {
  const dispatch = useDispatch();

  const works: workType[] = useSelector((state: RootState) => state.work);

  const work = works.find((each) => each.index === index);

  const [row, insertRow] = useState<any>([]);

  const addRow = () => {
    const rowIndex = shortenUUID(uuidv4());
    dispatch(addrow({ index: index, rowIndex: rowIndex }));
    insertRow(row.concat(<RowComp key={rowIndex} rowIndex={rowIndex} />));
  };

  return (
    <Card interactive={false} style={{ background: "gray", color: "white" }}>
      <h3>Company {index}</h3>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        Company Name:
        <InputGroup
          onChange={(e) =>
            dispatch(
              editCompanyName({ index: index, CompanyName: e.target.value })
            )
          }
        />
        Position:{" "}
        <InputGroup
          onChange={(e) =>
            dispatch(editPosition({ index: index, Position: e.target.value }))
          }
        />
        {/* ---------------------------Time Related-------------------------- */}
        <Switch
          onChange={(value) =>
            work?.current
              ? dispatch(
                  currentWorking({
                    index: index,
                    current: !work.current,
                  })
                )
              : dispatch(currentWorking({ index: index, current: true }))
          }
          label=" Currently Working"
        />
        <div className=" flex">
          Start Date:{" "}
          <div className=" text-black">
            <DatePicker
              onChange={(value) =>
                dispatch(editStartDate({ index: index, StartDate: value }))
              }
              value={work?.StartDate ? work.StartDate : null}
            />
          </div>
          End Date:
          <div className=" text-black">
            <DatePicker
              onChange={(value) =>
                dispatch(editEndDate({ index: index, EndDate: value }))
              }
              value={work?.EndDate ? work.EndDate : null}
              disabled={work?.current ? work.current : false}
            />
          </div>
        </div>
        {/* ---------------------------Dynamic-------------------------- */}
        Job Description:{" "}
        <div className="w-full">
          <Button icon="insert" onClick={addRow} />
          <TextArea
            large={true}
            style={{ width: "100%", height: 200 }}
            fill={true}
            onChange={(e) =>
              dispatch(
                editJobDescription({
                  index: index,
                  JobDescription: e.target.value,
                })
              )
            }
            //   value={textContent}
          />
        </div>
      </FormGroup>
    </Card>
  );
};

export default function InsertWorkExp() {
  const dispatch = useDispatch();
  const [links, insertLinks] = useState<any>([]);

  const uuid = uuidv4();

  const addLink = () => {
    dispatch(addWorkExp({ index: uuid }));
    insertLinks(links.concat(<InputComp key={links.length} index={uuid} />));
  };
  return (
    <div>
      <Button icon="insert" onClick={addLink} />
      {links?.map((each: any, i: number) => (
        <div key={i} className="w-full">
          {each}
        </div>
      ))}
    </div>
  );
}
