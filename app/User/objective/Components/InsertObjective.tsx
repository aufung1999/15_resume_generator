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

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";
import {
  ObjectiveState,
  addObjective,
  deleteObjective,
  editObjective,
} from "@/slices/objectiveSlice";
import { RootState } from "@/store/store";

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
    <Card interactive={false} style={{ background: "gray", color: "white" }}>
      <h3>Objective {index}</h3>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        Objective Description:
        <InputGroup
          onChange={(e) =>
            dispatch(
              editObjective({ index: index, ObjectiveDes: e.target.value })
            )
          }
        />
      </FormGroup>
    </Card>
  );
};

export default function InsertObjective() {
  const dispatch = useDispatch();
  const [objectives, editobjectives] = useState<any>([]);

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

  const deleteObj = (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteObjective({ index: received }));
    //update the useState of "educations"
    const after_remove = objectives.filter(
      (each: any) => each.props.index !== received
    );
    editobjectives(after_remove);
  };
  //***/
  return (
    <div>
      <Button icon="insert" onClick={addObj} />
      {objectives?.map((each: any, i: number) => (
        <div key={i}>
          <Button
            icon="delete"
            onClick={(e) => deleteObj(e, each.props.index)}
          />
          {each}
        </div>
      ))}
    </div>
  );
}
