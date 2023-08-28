"use client";
import React, { ReactElement, useEffect, useState, useTransition } from "react";
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
  switch_display_in_Resume,
} from "@/slices/projectsSlice";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";
import { ProjectState } from "@/slices/projectsSlice";

import toast, { Toaster } from "react-hot-toast";

import "react-quill/dist/quill.snow.css"; // Import Quill styles

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Props = {
  index: string;
  data: any;
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
  const row = target_project?.ProjectDescription?.find(
    (each) => each.rowIndex === rowIndex
  );
  //***/

  return (
    <div key={rowIndex}>
      {/* hide the index */}
      {/* <div>{rowIndex}</div> */}
      <ReactQuill
        value={row ? row.Row : ""}
        onChange={(value) =>
          dispatch(
            editProjectDescription({
              index: index,
              rowIndex: rowIndex,
              Row: value,
            })
          )
        }
      />
    </div>
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

  const projects_redux: ProjectState[] = useSelector(
    (state: RootState) => state.projects
  );
  const target_project: ProjectState | any = projects_redux.find(
    (each) => each.index === index
  );
  const { display_in_Resume, ...rest } = target_project || {};

  const [row, editRow] = useState<any>([]);

  useEffect(() => {
    let temp_arr: any[] = [];
    target_project?.ProjectDescription?.map((each: any) => {
      temp_arr.push(
        <RowComp key={each.rowIndex} index={index} rowIndex={each.rowIndex} />
      );
    });

    editRow(temp_arr);
    //Copy the "initialized" data from the database
    setCopy(rest);
    setRemind(false);
  }, [data]);

  //---------------------------To check if it equals to the data fetched from the database, if not UPDATE-------------------------------------------------------
  const [copyData, setCopy] = useState<ProjectState | null>(null);
  const [remind, setRemind] = useState(false);

  //Copy the "initialized" data from the database
  useEffect(() => {
    if (copyData) {
      //if LEFT and RIGHT sides are equal -> no NEED to update data in database

      JSON.stringify(copyData) === JSON.stringify(rest)
        ? setRemind(false)
        : setRemind(true);
    }
  }, [target_project]);

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

  //---------------Save to Server-------------------
  const SubmitHandler = () => {
    fetch("/api/user/project", {
      //add this route later
      method: "POST",
      body: JSON.stringify(projects_redux),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        //2. update redux side
        dispatch(cleanUp_Project_redux());
        projects_redux.map((each: ProjectState) => {
          dispatch(initialize_ProjectData(each));
        });
      })
      .then(() => {
        //1. update client side
        setCopy(rest);
        setRemind(false);
      })
      .then(() => {
        toast.success("User Projects Updated!");
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
      ${pathname.split("/").includes("user") ? " px-5 " : ""}
      ${remind ? " bg-red-300 " : " bg-green-200 "}`}
    >
      <div className="flex-row">
        {/* hide the index */}
        {/* <h3>Project {index}</h3> */}
        {pathname.split("/").includes("resume") && (
          <Switch
            checked={target_project?.display_in_Resume}
            onChange={() =>
              dispatch(
                switch_display_in_Resume({
                  index: index,
                  display_in_Resume: !target_project?.display_in_Resume,
                })
              )
            }
          />
        )}
      </div>

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
        <div className="w-full flex flex-col justify-between h-full">
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
          ))}

          <button
            onClick={addRow}
            className="bp3-button hover:bg-blue-500 hover:bg-opacity-50 hover:text-white w-full font-bold text-xs text-blue-500 "
          >
            + Add Project Description
          </button>
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
export default function InsertProject({ data }: any) {
  const pathname = usePathname();
  const projects_redux = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();
  const [projects_csr, editProjects] = useState<any>([]);

  useEffect(() => {
    dispatch(cleanUp_Project_redux());
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: ProjectState) => {
        dispatch(initialize_ProjectData(each));
      });
    }
  }, [data]);

  //----------------------------------------------------------------------------------

  useEffect(() => {
    let temp_arr: any[] = [];
    if (projects_redux.length !== 0) {
      projects_redux.map((each: any) => {
        temp_arr.push(
          <InputComp key={each.index} index={each.index} data={data} />
        );
      });
      editProjects(temp_arr);
    }
  }, [projects_redux, data]);

  //---------------ADD/DELETE-------------------
  const addProj = () => {
    //initialize the "index"
    const uuid = uuidv4();
    // update the Redux Store
    dispatch(addProject({ index: uuid }));
    //update the useState of "projects_csr"
    editProjects(
      projects_csr.concat(
        <InputComp key={projects_csr.length} index={uuid} data={data} />
      )
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
    <div className="">
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
        {projects_csr?.map((each: any, i: number) => (
          <div key={i} className="w-full border-2 relative ">
            {each}
            <Button
              className="absolute top-0 right-0 "
              style={{
                backgroundColor: "rgba(255,0,0,0.6)",
                borderRadius: "25% 10%",
              }}
              onClick={(e) => deleteProj(e, each.props.index)}
            >
              <Icon icon="delete" className="" style={{ color: "white" }} />
            </Button>
          </div>
        ))}
      </div>

      <button
        onClick={addProj}
        className="bp3-button hover:bg-blue-500 hover:bg-opacity-50 hover:text-white w-full font-bold text-xs text-blue-500 "
      >
        + Add Project
      </button>
    </div>
  );
}
