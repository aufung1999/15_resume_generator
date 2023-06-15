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
  editCompanyName,
  editPosition,
  editStartDate,
  editEndDate,
  addrow,
  editJobDescription,
  currentWorking,
  deleterow,
  WorkExpState,
  deleteWorkExp,
} from "@/slices/workSlice";
import DatePicker from "react-date-picker";
import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

type Props = {
  index: string;
  workExps: ReactElement[];
  editWorkExps: Function;
};
type rowProps = {
  index: string;
  rowIndex: string;
  row: ReactElement[];
  editRow: Function; // pass from the parent component
};

//*         Important Info.       */
// Child Component: X
//Parent Component: InputComp
const RowComp = ({ index, rowIndex, row, editRow }: rowProps) => {
  const dispatch = useDispatch();

  const deleteRow = () => {
    // update the Redux Store
    dispatch(deleterow({ index: index, rowIndex: rowIndex }));
    //update the useState of "row"
    const after_remove = row.filter((each: any) => each.key === rowIndex);
    editRow(after_remove);
  };

  return (
    <div>
      <div>{rowIndex}</div>
      <Button icon="delete" onClick={deleteRow} />
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
        //   value={textContent}
      />
    </div>
  );
};

//*         Important Info.       */
// Child Component: RowComp
//Parent Component: InsertWorkExp
const InputComp = ({ workExps, editWorkExps, index }: Props) => {
  const dispatch = useDispatch();

  const works: WorkExpState[] = useSelector((state: RootState) => state.work);
  const work = works.find((each) => each.index === index);

  const [row, editRow] = useState<any>([]);

  useEffect(() => {

  }, [works]);

  const addRow = () => {
    const rowIndex = shortenUUID(uuidv4());
    // update the Redux Store
    dispatch(addrow({ index: index, rowIndex: rowIndex }));
    //update the useState
    editRow(
      row.concat(
        <RowComp
          key={rowIndex}
          index={index}
          rowIndex={rowIndex}
          editRow={editRow}
          row={row}
        />
      )
    );
    console.log(row);
  };

  const deleteExp = () => {
    // update the Redux Store
    dispatch(deleteWorkExp({ index: index }));
    //update the useState of "workExps"
    const after_remove = workExps.filter((each: any) => each.key === index);
    editWorkExps(after_remove);
  };

  return (
    <Card interactive={false} style={{ background: "gray", color: "white" }}>
      <h3>Company {index}</h3>
      <Button icon="delete" onClick={deleteExp} />
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
          {row?.map((each: any, i: number) => (
            <div key={i} className="border-2">
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

  const uuid = uuidv4();

  const addExp = () => {
    // update the Redux Store
    dispatch(addWorkExp({ index: uuid }));
    //update the useState of "workExps"
    editWorkExps(
      workExps.concat(
        <InputComp
          key={workExps.length}
          index={uuid}
          workExps={workExps}
          editWorkExps={editWorkExps}
        />
      )
    );
  };
  return (
    <div>
      <Button icon="insert" onClick={addExp} />
      {workExps?.map((each: any, i: number) => (
        <div key={i} className="w-full">
          {each}
        </div>
      ))}
    </div>
  );
}
