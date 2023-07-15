"use client";
import React, { ReactElement, useEffect, useState } from "react";
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
import "@blueprintjs/core/lib/css/blueprint.css";

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
  initialize_WorkData,
  cleanUp_Work_redux,
} from "@/slices/workSlice";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

import toast, { Toaster } from "react-hot-toast";

type Props = {
  index: string;
};
type rowProps = {
  index: string;
  rowIndex: string;
};

//*         Important Info.       */
// Child Component: X
//Parent Component: InputComp
const RowComp = ({ index, rowIndex }: rowProps) => {
  const dispatch = useDispatch();

  // get the dynamic variable of "row" from the redux store
  const works: WorkExpState[] = useSelector((state: RootState) => state.work);
  const work = works.find((each) => each.index === index);
  const row = work?.JobDescription.find((each) => each.rowIndex === rowIndex);
  //***/

  return (
    <div key={rowIndex}>
      <div>{rowIndex}</div>

      <TextArea
        large={true}
        fill={true}
        growVertically={true}
        onChange={(e) =>
          dispatch(
            editJobDescription({
              index: index,
              rowIndex: rowIndex,
              Row: e.target.value,
            })
          )
        }
        value={row ? row.Row : ""}
      />
    </div>
  );
};

//*         Important Info.       */
// Child Component: RowComp
//Parent Component: InsertWorkExp
const InputComp = ({ index }: Props) => {
  const dispatch = useDispatch();

  const works: WorkExpState[] = useSelector((state: RootState) => state.work);
  const work = works.find((each) => each.index === index);

  const [row, editRow] = useState<any>([]);

  useEffect(() => {
    let temp_arr: any[] = [];
    work?.JobDescription?.map((each: any) => {
      temp_arr.push(
        <RowComp key={each.rowIndex} index={index} rowIndex={each.rowIndex} />
      );
    });

    editRow(temp_arr);
  }, []);

  //---------------ADD/DELETE-------------------
  const addRow = () => {
    const rowIndex = shortenUUID(uuidv4());
    // update the Redux Store
    dispatch(addrow({ index: index, rowIndex: rowIndex }));
    //update the useState
    editRow(
      row.concat(<RowComp key={rowIndex} index={index} rowIndex={rowIndex} />)
    );
  };

  const deleteRow = (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleterow({ index: index, rowIndex: received }));
    //update the useState of "row"
    const after_remove = row.filter((each: any) => each.key !== received);
    editRow(after_remove);
  };
  //***/

  return (
    <Card interactive={false} style={{ background: "white", color: "black" }}>
      <h3>Company {index}</h3>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        Company Name:
        <InputGroup
          value={work ? work?.CompanyName : ""}
          onChange={(e) =>
            dispatch(
              editCompanyName({ index: index, CompanyName: e.target.value })
            )
          }
        />
        Position:{" "}
        <InputGroup
          value={work ? work?.Position : ""}
          onChange={(e) =>
            dispatch(editPosition({ index: index, Position: e.target.value }))
          }
        />
        {/* ---------------------------Time Related-------------------------- */}
        <Switch
          checked={work?.current}
          onChange={() =>
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
        <div className=" flex-col ">
          Start Date:{" "}
          <div className=" text-black ">
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
          {row?.map((each: any, i: number) => (
            <div key={i} className="border-2 relative">
              <Button
                style={{
                  backgroundColor: "rgba(255,0,0,0.6)",
                  borderRadius: "25% 10%",
                }}
                className="absolute top-0 right-0 "
                onClick={(e) => deleteRow(e, each.key)}
                icon={
                  <Icon
                    icon="delete"
                    className=""
                    style={{ color: "white" }}
                    size={10}
                  />
                }
                small
              />
              {each}
            </div>
          ))}{" "}
          <Button
            icon={
              <Icon icon="insert" className="" style={{ color: "white" }} />
            }
            onClick={addRow}
            style={{
              backgroundColor: "rgba(0,120,255,1)",
            }}
            small
          />
        </div>
      </FormGroup>
    </Card>
  );
};

//*         Important Info.       */
// Child Component: InputComp
//Parent Component: X
export default function InsertWorkExp({ data }: any) {
  const work = useSelector((state: RootState) => state.work);
  const dispatch = useDispatch();
  const [workExps, editWorkExps] = useState<any>([]);

  useEffect(() => {
    dispatch(cleanUp_Work_redux());
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: any) => {
        dispatch(initialize_WorkData(each));
      });
    }
  }, []);

  useEffect(() => {
    let temp_arr: any[] = [];
    if (work.length !== 0) {
      work.map((each) => {
        temp_arr.push(<InputComp key={each.index} index={each.index} />);
      });
      editWorkExps(temp_arr);
    }
  }, [work]);

  //---------------ADD/DELETE-------------------
  const addExp = () => {
    //initialize the "index"
    const uuid = uuidv4();
    // update the Redux Store
    dispatch(addWorkExp({ index: uuid }));
    //update the useState of "workExps"
    editWorkExps(
      workExps.concat(<InputComp key={workExps.length} index={uuid} />)
    );
  };

  const deleteExp = async (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteWorkExp({ index: received }));
    //update the useState of "workExps"
    const after_remove = workExps.filter(
      (each: any) => each.props.index !== received
    );
    editWorkExps(after_remove);
    //delete from the MongoDB
    await fetch(`/api/user/work/delete`, {
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
    <div className="w-full">
      <Toaster />

      {workExps?.map((each: any, i: number) => (
        <div key={i} className="w-full border-2 relative">
          <Button
            className="absolute top-0 right-0 "
            style={{
              backgroundColor: "rgba(255,0,0,0.6)",
              borderRadius: "25% 10%",
            }}
            onClick={(e) => deleteExp(e, each.props.index)}
          >
            <Icon icon="delete" className="" style={{ color: "white" }} />
          </Button>
          {each}
        </div>
      ))}
      <Button
        icon={<Icon icon="insert" className="" style={{ color: "white" }} />}
        onClick={addExp}
        fill
        style={{
          backgroundColor: "rgba(0,120,255,1)",
        }}
      />
    </div>
  );
}
