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
  editJobDescription,
  currentWorking,
} from "@/slices/workSlice";
import DatePicker from "react-date-picker";
import { RootState } from "@/store/store";

type Props = {
  index: number;
};

const InputComp = ({ index }: Props) => {
  const dispatch = useDispatch();

  const work = useSelector((state: RootState) => state.work);

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
            work[index].current
              ? dispatch(
                  currentWorking({
                    index: index,
                    current: !work[index].current,
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
              value={work[index].StartDate || null}
            />
          </div>
          End Date:
          <div className=" text-black">
            <DatePicker
              onChange={(value) =>
                dispatch(editEndDate({ index: index, EndDate: value }))
              }
              value={work[index].EndDate || null}
              disabled={work[index].current}
            />
          </div>
        </div>
        {/* ---------------------------Time Related-------------------------- */}
        Job Description:{" "}
        <div className="w-full">
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

  const addLink = () => {
    dispatch(addWorkExp({ index: links.length }));
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
