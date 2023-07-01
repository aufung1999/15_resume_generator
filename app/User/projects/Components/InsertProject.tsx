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
  initialize_ProjectData,
  addProject,
  deleteProject,
  editProjectName,
  editTechniques,
  addrow,
  deleterow,
  editProjectDescription,
  cleanUp_Project_redux,
} from "@/slices/projectsSlice";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";
import { ProjectState } from "@/slices/projectsSlice";

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
  const projects_redux: ProjectState[] = useSelector(
    (state: RootState) => state.projects
  );
  const target_project = projects_redux.find((each) => each.index === index);
  const row = target_project?.ProjectDescription.find(
    (each) => each.rowIndex === rowIndex
  );
  //***/

  return (
    <div key={rowIndex}>
      <div>{rowIndex}</div>

      <TextArea
        large={true}
        style={{ width: "100%", height: 50 }}
        fill={true}
        onChange={(e) =>
          dispatch(
            editProjectDescription({
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

  const projects_redux: ProjectState[] = useSelector(
    (state: RootState) => state.projects
  );
  const target_project = projects_redux.find((each) => each.index === index);

  const [row, editRow] = useState<any>([]);

  useEffect(() => {
    let temp_arr: any[] = [];
    target_project?.ProjectDescription?.map((each: any) => {
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

  const deleteRow = async (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleterow({ index: index, rowIndex: received }));
    //update the useState of "row"
    const after_remove = row.filter((each: any) => each.key !== received);
    editRow(after_remove);
    //delete from the MongoDB
    await fetch(`/api/user/project/${received}`, {
      method: "DELETE",
    })
      .then(() => toast.success("Deleted!"))
      .catch(() => toast.error("Cannot Delete!"));
  };
  //***/

  return (
    <Card interactive={false} style={{ background: "gray", color: "black" }}>
      <h3>Project {index}</h3>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        Project Name:
        <InputGroup
          value={target_project ? target_project?.ProjectName : ""}
          onChange={(e) =>
            dispatch(
              editProjectName({ index: index, ProjectName: e.target.value })
            )
          }
        />
        Techniques:{" "}
        <InputGroup
          value={target_project ? target_project?.Techniques : ""}
          onChange={(e) =>
            dispatch(
              editTechniques({ index: index, Techniques: e.target.value })
            )
          }
        />
        {/* ---------------------------Dynamic-------------------------- */}
        Project Description:{" "}
        <div className="w-full">
          <Button icon="insert" onClick={addRow} />
          {row?.map((each: any, i: number) => (
            <div key={i} className="border-2">
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
export default function InsertProject({ data }: any) {
  const projects_redux = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();
  const [projects_csr, editProjects] = useState<any>([]);

  useEffect(() => {
    dispatch(cleanUp_Project_redux());
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: any) => {
        dispatch(initialize_ProjectData(each));
      });
    }
  }, []);

  useEffect(() => {
    let temp_arr: any[] = [];
    if (projects_redux.length !== 0) {
      projects_redux.map((each) => {
        temp_arr.push(<InputComp key={each.index} index={each.index} />);
      });
      editProjects(temp_arr);
    }
  }, [projects_redux]);

  //---------------ADD/DELETE-------------------
  const addProj = () => {
    //initialize the "index"
    const uuid = uuidv4();
    // update the Redux Store
    dispatch(addProject({ index: uuid }));
    //update the useState of "projects_csr"
    editProjects(
      projects_csr.concat(<InputComp key={projects_csr.length} index={uuid} />)
    );
  };

  const deleteProj = async (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteProject({ index: received }));
    //update the useState of "projects_csr"
    const after_remove = projects_csr.filter(
      (each: any) => each.props.index !== received
    );
    editProjects(after_remove);
    //delete from the MongoDB
    await fetch(`/api/user/project/delete`, {
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
      <Button icon="insert" onClick={addProj} />
      {projects_csr?.map((each: any, i: number) => (
        <div key={i} className="w-full border-2">
          <Button
            icon="delete"
            onClick={(e) => deleteProj(e, each.props.index)}
          />
          {each}
        </div>
      ))}
    </div>
  );
}
