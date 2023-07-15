"use client";
import React, { useEffect, useState } from "react";
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

type Props = {
  index: string;
};

const InputComp = ({ index }: Props) => {
  const dispatch = useDispatch();

  const objectives: ObjectiveState[] = useSelector(
    (state: RootState) => state.objectives
  );
  const objective = objectives.find((each) => each.index === index);

  return (
    <Card interactive={false} style={{ background: "white", color: "black" }}>
      <div className="flex-row">
        <h3>Objective {index}</h3>
        <Switch
          checked={objective?.display_in_Resume}
          onChange={() =>
            dispatch(
              switch_display_in_Resume({
                index: index,
                display_in_Resume: !objective?.display_in_Resume,
              })
            )
          }
        />
      </div>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        Objective Description:
        <TextArea
          onChange={(e) =>
            dispatch(
              editObjective({ index: index, ObjectiveDes: e.target.value })
            )
          }
          value={objective ? objective?.ObjectiveDes : ""}
          growVertically={true}
          fill
        />
      </FormGroup>
    </Card>
  );
};

export default function InsertObjective({ data }: any) {
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
  }, []);

  useEffect(() => {
    let temp_arr: any[] = [];
    if (objective_redux.length !== 0) {
      objective_redux.map((each) => {
        temp_arr.push(<InputComp key={each.index} index={each.index} />);
      });
      editobjectives(temp_arr);
    }
  }, [objective_redux]);

  //---------------ADD/DELETE-------------------
  const addObj = () => {
    //initialize the "index"
    const uuid = uuidv4();
    const short_id = shortenUUID(uuid);
    // update the Redux Store
    dispatch(addObjective({ index: short_id }));
    //update the useState of "educations"
    editobjectives(
      objectives.concat(<InputComp key={short_id} index={short_id} />)
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

      {objectives?.map((each: any, i: number) => (
        <div key={i}>
          <div className="flex relative">
            <div>{each}</div>

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
      <Button
        icon={<Icon icon="insert" className="" style={{ color: "white" }} />}
        onClick={addObj}
        fill
        style={{
          backgroundColor: "rgba(0,120,255,1)",
        }}
      />
    </div>
  );
}
