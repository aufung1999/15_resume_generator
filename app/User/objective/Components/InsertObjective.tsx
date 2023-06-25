"use client";
import React, { useEffect, useState } from "react";
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
  initialize_ObjectiveData,
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
          value={objective ? objective?.ObjectiveDes : ""}
        />
      </FormGroup>
    </Card>
  );
};

export default function InsertObjective({ data }) {
  const objective = useSelector((state: RootState) => state.objectives);
  const dispatch = useDispatch();
  const [objectives, editobjectives] = useState<any>([]);

  //fetch data from the collection of "Skills" from Database at the initial stage
  // useEffect(() => {
  //   let temp_arr: any[] = [];
  //   const getData = async () => {
  //     data?.map((each: ObjectiveState) => {
  //       //---After receive data from MongoDB, dispatch to Redux
  //       dispatch(addObjective({ index: each.index }));
  //       dispatch(
  //         editObjective({ index: each.index, ObjectiveDes: each.ObjectiveDes })
  //       );

  //       //this is the part where it Generate the Fetched data from MongoDB to Frontend
  //       temp_arr.push(<InputComp key={each.index} index={each.index} />);
  //     });
  //   };
  //   getData();

  //   //this is the part where it Generate the Fetched data from MongoDB to Frontend
  //   editobjectives(temp_arr);
  // }, [data]);

  useEffect(() => {
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: any) => {
        dispatch(initialize_ObjectiveData(each));
      });
    }
  }, [data]);

  useEffect(() => {
    let temp_arr: any[] = [];
    if (objective.length !== 0) {
      objective.map((each) => {
        temp_arr.push(<InputComp key={each.index} index={each.index} />);
      });
      editobjectives(temp_arr);
    }
  }, [objective]);

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
