"use client";
import React, { ReactElement, useEffect, useState } from "react";
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

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

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
const RowComp = ({ index, rowIndex, Row }: rowProps) => {
  const dispatch = useDispatch();

  // get the row from the redux store
  const works: WorkExpState[] = useSelector((state: RootState) => state.work);
  const work = works.find((each) => each.index === index);
  const row = work?.JobDescription.find((each) => each.rowIndex === rowIndex);

  return (
    <div key={rowIndex}>
      <div>{rowIndex}</div>

      <TextArea
        large={true}
        style={{ width: "100%", height: 50 }}
        fill={true}
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
    work?.JobDescription.map((each: any) => {
      editRow(
        row.concat(
          <RowComp key={each.rowIndex} index={index} rowIndex={each.rowIndex} />
        )
      );
    });
  }, []);

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

  return (
    <Card interactive={false} style={{ background: "gray", color: "white" }}>
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
          {row?.map((each: any, i: number) => (
            <div key={i} className="border-2">
              {console.log("each: " + JSON.stringify(each, null, 1))}
              <Button icon="delete" onClick={(e) => deleteRow(e, each.key)} />
              {each}
            </div>
          ))}
        </div>
      </FormGroup>
    </Card>
  );
};

//*         Important Info.       */
// Child Component: InputComp
//Parent Component: X
export default function InsertWorkExp() {
  const dispatch = useDispatch();
  const [workExps, editWorkExps] = useState<any>([]);

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
            current: each.current === undefined ? false : each.current,
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

        //this is the part where it Generate the Fetched data from MongoDB to Frontend
        editWorkExps(
          workExps.concat(
            <InputComp key={workExps.length} index={each.index} />
          )
        );
      });
    };
    getData();
  }, []);

  const addExp = () => {
    const uuid = uuidv4();
    // update the Redux Store
    dispatch(addWorkExp({ index: uuid }));
    //update the useState of "workExps"
    editWorkExps(
      workExps.concat(<InputComp key={workExps.length} index={uuid} />)
    );
  };

  const deleteExp = (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteWorkExp({ index: received }));
    //update the useState of "workExps"
    const after_remove = workExps.filter(
      (each: any) => each.props.index !== received
    );
    editWorkExps(after_remove);
  };
  return (
    <div>
      <Button icon="insert" onClick={addExp} />
      {workExps?.map((each: any, i: number) => (
        <div key={i} className="w-full border-2">
          <Button
            icon="delete"
            onClick={(e) => deleteExp(e, each.props.index)}
          />
          {each}
        </div>
      ))}
    </div>
  );
}
