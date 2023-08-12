"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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
  switch_display_in_Resume,
} from "@/slices/workSlice";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

import toast, { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { add_display, remove_display } from "@/slices/resumeSlice";
import EachResume from "@/app/user/Components/Resume";

type Props = {
  index: string;
  data: any;
};
type rowProps = {
  index: string;
  rowIndex: string;
  data: any;
  remind: boolean;
};

//*         Important Info.       */
// Child Component: X
//Parent Component: InputComp
const RowComp = ({ index, rowIndex, data, remind }: rowProps) => {
  const dispatch = useDispatch();

  // get the dynamic variable of "row" from the redux store
  const works_redux: WorkExpState[] = useSelector(
    (state: RootState) => state.work
  );
  const target_work = works_redux.find((each) => each.index === index);
  const row = target_work?.JobDescription.find(
    (each) => each.rowIndex === rowIndex
  );
  //***/

  const [dynamicGrow, setDynamicGrow] = useState(false);

  useEffect(() => {
    setDynamicGrow(true);
  }, [row]);

  //Similar way as setCopy in the InputComp
  const [copyData, setCopy] = useState<string | null | undefined>(null);

  useEffect(() => {
    //Copy the "initialized" data from the database
    setCopy(row?.Row);
  }, [data]);

  // Keep track if the row description changes then it will remove the matches count
  const [limit, reachLimit] = useState("false");
  useEffect(() => {
    const stage_3_ls: any = window.localStorage.getItem("stage_3");

    const filter_array = JSON.parse(stage_3_ls).filter(
      (each: any) =>
        JSON.stringify(each?.user_data) === JSON.stringify(copyData)
    );

    if (copyData !== row?.Row && limit === "false") {
      filter_array.map((each: any) =>
        dispatch(remove_display({ sentence: each.match_sentence }))
      );
      reachLimit("true");
    }

    if (copyData === row?.Row && limit === "true") {
      filter_array.map((each: any) =>
        dispatch(
          add_display({ sentence: each.match_sentence, from: "matches" })
        )
      );
      reachLimit("false");
    }
    // change to remind dependency?
  }, [row]);

  useEffect(() => {
    remind ? reachLimit("true") : reachLimit("false");
  }, [remind]);

  // ----------------------------------------

  return (
    <TextArea
      key={rowIndex}
      // large={true}
      fill={true}
      growVertically={dynamicGrow}
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
  );
};
//===================================================================================================================================================================================
//===================================================================================================================================================================================
//===================================================================================================================================================================================

//*         Important Info.       */
// Child Component: RowComp
//Parent Component: InsertWorkExp
const InputComp = ({ index, data }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const dispatch = useDispatch();

  const works_redux: WorkExpState[] = useSelector(
    (state: RootState) => state.work
  );
  const target_work: WorkExpState | any = works_redux.find(
    (each) => each.index === index
  );
  const { display_in_Resume, ...rest } = target_work;

  const [row, editRow] = useState<any>([]);

  useEffect(() => {
    let temp_arr: any[] = [];
    target_work?.JobDescription?.map((each: any) => {
      temp_arr.push(
        <RowComp
          key={each.rowIndex}
          index={index}
          rowIndex={each.rowIndex}
          data={data}
          remind={remind}
        />
      );
    });

    editRow(temp_arr);
    //Copy the "initialized" data from the database
    setCopy(rest);
    setRemind(false);
  }, [data]);

  //---------------------------To check if it equals to the data fetched from the database, if not UPDATE-------------------------------------------------------
  const [copyData, setCopy] = useState<WorkExpState | null>(null);
  const [remind, setRemind] = useState(false);

  //Copy the "initialized" data from the database
  useEffect(() => {
    if (copyData) {
      //if LEFT and RIGHT sides are equal -> no NEED to update data in database
      JSON.stringify(copyData) === JSON.stringify(rest)
        ? setRemind(false)
        : setRemind(true);
    }
  }, [target_work]);

  //---------------ADD/DELETE-------------------
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
          data={data}
          remind={remind}
        />
      )
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

  //---------------Save to Server-------------------
  const SubmitHandler = () => {
    const stage_3_ls: any = window.localStorage.getItem("stage_3");
    fetch("/api/user/work", {
      //add this route later
      method: "POST",
      body: JSON.stringify(works_redux),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        toast.success("User Works Updated!");
        //After Submit Btn pressed
        //1. update client side
        setCopy(rest);
        setRemind(false);
        //2. update redux side
        dispatch(cleanUp_Work_redux());
        works_redux.map((each: WorkExpState) => {
          dispatch(initialize_WorkData(each));
        });
      })
      .catch(() => toast.error("Cannot Update!"));

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <div
      style={{ color: "black" }}
      className={`w-full h-full
    ${pathname.split("/").includes("user") ? "px-5" : ""}
    ${remind ? " bg-red-300" : " bg-green-200"}`}
    >
      <div className="flex-row">
        {/* hide the index */}
        {/* <h3>Company {index}</h3> */}
        {pathname.split("/").includes("resume") && (
          <Switch
            checked={target_work?.display_in_Resume}
            onChange={() =>
              dispatch(
                switch_display_in_Resume({
                  index: index,
                  display_in_Resume: !target_work?.display_in_Resume,
                })
              )
            }
          />
        )}
      </div>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        Company Name:
        <InputGroup
          value={target_work ? target_work?.CompanyName : ""}
          onChange={(e) =>
            dispatch(
              editCompanyName({ index: index, CompanyName: e.target.value })
            )
          }
        />
        Position:{" "}
        <InputGroup
          value={target_work ? target_work?.Position : ""}
          onChange={(e) =>
            dispatch(editPosition({ index: index, Position: e.target.value }))
          }
        />
        {/* ---------------------------Time Related-------------------------- */}
        <Switch
          checked={target_work?.current}
          onChange={() =>
            target_work?.current
              ? dispatch(
                  currentWorking({
                    index: index,
                    current: !target_work.current,
                  })
                )
              : dispatch(currentWorking({ index: index, current: true }))
          }
          label=" Currently Working"
        />
        <div
          className={`flex ${
            pathname.split("/").includes("resume") ? "" : " flex-col "
          }`}
        >
          <div className=" text-black ">
            Start Date:{" "}
            <DatePicker
              onChange={(value) =>
                dispatch(editStartDate({ index: index, StartDate: value }))
              }
              value={target_work?.StartDate ? target_work.StartDate : null}
            />
          </div>
          <div className=" text-black">
            End Date:
            <DatePicker
              onChange={(value) =>
                dispatch(editEndDate({ index: index, EndDate: value }))
              }
              value={target_work?.EndDate ? target_work.EndDate : null}
              disabled={target_work?.current ? target_work.current : false}
            />
          </div>
        </div>
        {/* ---------------------------Dynamic-------------------------- */}
        Job Description:{" "}
        <div className="w-full flex flex-col justify-between h-full">
          {row?.map((each: any, i: number) => (
            <div key={i} className="border-2 relative">
              <Button
                style={{
                  backgroundColor: "rgba(255,0,0,0.6)",
                  borderRadius: "25% 10%",
                }}
                className="absolute top-0 right-0 z-10"
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
          {remind && (
            <Button className="" intent="warning" onClick={SubmitHandler}>
              Submit
            </Button>
          )}
        </div>
      </FormGroup>
    </div>
  );
};
//===================================================================================================================================================================================
//===================================================================================================================================================================================
//===================================================================================================================================================================================

//*         Important Info.       */
// Child Component: InputComp
//Parent Component: X
export default function InsertWorkExp({ data }: any) {
  const pathname = usePathname();
  const work = useSelector((state: RootState) => state.work);
  const dispatch = useDispatch();
  const [workExps, editWorkExps] = useState<any>([]);

  useEffect(() => {
    dispatch(cleanUp_Work_redux());
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: WorkExpState) => {
        dispatch(initialize_WorkData(each));
      });
    }
  }, [data]);

  //----------------------------------------------------------------------------------

  useEffect(() => {
    let temp_arr: any[] = [];
    if (work.length !== 0) {
      work.map((each: any) => {
        temp_arr.push(
          <InputComp key={each.index} index={each.index} data={data} />
        );
      });
      editWorkExps(temp_arr);
    }
  }, [work, data]);

  //---------------ADD/DELETE-------------------
  const addExp = () => {
    //initialize the "index"
    const uuid = uuidv4();
    // update the Redux Store
    dispatch(addWorkExp({ index: uuid }));
    //update the useState of "workExps"
    editWorkExps(
      workExps.concat(
        <InputComp key={workExps.length} index={uuid} data={data} />
      )
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

      <div
        className={`
          grid grid-cols-1 border border-green-300 ${
            pathname.split("/").includes("user")
              ? "  grid-cols-3 gap-3 "
              : "" + pathname.split("/").includes("resume")
              ? " w-full "
              : ""
          }
        `}
      >
        {workExps?.map((each: any, i: number) => (
          <div key={i} className="w-full border-2 relative">
            <Button
              className="absolute top-0 right-0 z-10"
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
      </div>
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
