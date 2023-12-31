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
import "tailwindcss/tailwind.css";

import { useSelector, useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";
import {
  ObjectiveState,
  addObjective,
  cleanUp_Objective_redux,
  deleteObjective,
  editObjective,
  initialize_ObjectiveData,
  switch_display_in_Resume,
} from "@/slices/objectiveSlice";
import { RootState } from "@/store/store";

import toast, { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

type Props = {
  index: string;
  data: any;
};

const InputComp = ({ index, data }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const dispatch = useDispatch();

  const objectives_redux: ObjectiveState[] = useSelector(
    (state: RootState) => state.objectives
  );
  const target_objective: ObjectiveState | any = objectives_redux.find(
    (each) => each.index === index
  );
  const { display_in_Resume, ...rest } = target_objective;

  useEffect(() => {
    //Copy the "initialized" data from the database
    setCopy(rest);
    setRemind(false);
  }, [data]);

  //---------------------------To check if it equals to the data fetched from the database, if not UPDATE-------------------------------------------------------
  const [copyData, setCopy] = useState<any | null>(null);
  const [remind, setRemind] = useState(false);

  //Copy the "initialized" data from the database
  useEffect(() => {
    if (copyData) {
      //if LEFT and RIGHT sides are equal -> no NEED to update data in database
      JSON.stringify(copyData) === JSON.stringify(rest)
        ? setRemind(false)
        : setRemind(true);
    }
  }, [target_objective]);

  //---------------Save to Server-------------------
  const SubmitHandler = () => {
    fetch("/api/user/objective", {
      //add this route later
      method: "POST",
      body: JSON.stringify(objectives_redux),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        toast.success("User Objectives Updated!"),
          //After Submit Btn pressed
          //1. update client side
          setCopy(rest),
          setRemind(false),
          //2. update redux side
          dispatch(cleanUp_Objective_redux());
        objectives_redux?.map((each: ObjectiveState) =>
          dispatch(initialize_ObjectiveData(each))
        );
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
      className={`
    w-full border
    ${pathname.split("/").includes("user") ? "  px-5 " : ""}
    ${pathname.split("/").includes("resume") ? " " : ""}
    ${remind ? " bg-red-300" : " bg-green-200"}
      `}
      style={{ color: "black" }}
    >
      <div className="flex-row">
        {/* hide the index */}
        {/* <h3>Objective {index}</h3> */}
        {pathname.split("/").includes("resume") && (
          <Switch
            checked={target_objective?.display_in_Resume}
            onChange={() =>
              dispatch(
                switch_display_in_Resume({
                  index: index,
                  display_in_Resume: !target_objective?.display_in_Resume,
                })
              )
            }
          />
        )}
      </div>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        <div className="w-full border text-sm font-semibold italic">
          Objective Description:
        </div>
        <TextArea
          onChange={(e) =>
            dispatch(
              editObjective({ index: index, ObjectiveDes: e.target.value })
            )
          }
          value={target_objective ? target_objective?.ObjectiveDes : ""}
          growVertically={true}
          fill
        />
      </FormGroup>
      {remind && (
        <Button className=" w-full" intent="warning" onClick={SubmitHandler}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default function InsertObjective({ data }: any) {
  const pathname = usePathname();
  const objective_redux = useSelector((state: RootState) => state.objectives);
  const dispatch = useDispatch();
  const [objectives, editobjectives] = useState<any>([]);

  useEffect(() => {
    dispatch(cleanUp_Objective_redux());
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: any) => {
        dispatch(initialize_ObjectiveData(each));
      });
    }
  }, [data]);

  useEffect(() => {
    let temp_arr: any[] = [];
    if (objective_redux.length !== 0) {
      objective_redux.map((each: any) => {
        temp_arr.push(
          <InputComp key={each.index} index={each.index} data={data} />
        );
      });
      editobjectives(temp_arr);
    }
  }, [objective_redux, data]);

  //---------------ADD/DELETE-------------------
  const addObj = () => {
    //initialize the "index"
    const uuid = uuidv4();
    const short_id = shortenUUID(uuid);
    // update the Redux Store
    dispatch(addObjective({ index: short_id }));
    //update the useState of "educations"
    editobjectives(
      objectives.concat(
        <InputComp key={short_id} index={short_id} data={data} />
      )
    );
  };

  const deleteObj = async (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteObjective({ index: received }));
    //update the useState of "educations"
    const after_remove = objectives.filter(
      (each: any) => each.props.index !== received
    );
    editobjectives(after_remove);
    //delete from the MongoDB
    await fetch(`/api/user/objective/delete`, {
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
        {objectives?.map((each: any, i: number) => (
          <div key={i} className="w-full border-2 border-green-300 ">
            <div className="flex relative">
              <div
                className={`
           border-green-300 ${
             pathname.split("/").includes("user")
               ? " w-full "
               : "" + pathname.split("/").includes("resume")
               ? " w-full "
               : ""
           }
        `}
              >
                {each}
              </div>

              <Button
                className="absolute top-0 right-0 "
                style={{
                  backgroundColor: "rgba(255,0,0,0.6)",
                  borderRadius: "25% 10%",
                }}
                onClick={(e) => deleteObj(e, each.props.index)}
              >
                <Icon icon="delete" className="" style={{ color: "white" }} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addObj}
        className="bp3-button hover:bg-blue-500 hover:bg-opacity-50 hover:text-white w-full font-bold text-xs text-blue-500 "
      >
        + Add Objective
      </button>
    </div>
  );
}
