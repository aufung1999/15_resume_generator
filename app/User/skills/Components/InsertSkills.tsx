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
import {
  SkillsState,
  addSkill,
  addTerm,
  cleanUp_Skill_redux,
  deleteSkill,
  deleteTerm,
  editSkillName,
  editTermName,
  initialize_SkillData,
} from "@/slices/skillsSlice";
import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

import useSWR from "swr";

import toast, { Toaster } from "react-hot-toast";

type Props = {
  index: string;
  term?: string;
};

//*         Important Info.       */
// Child Component: X
//Parent Component: InsertSkills
const TermComp = ({ index, term }: Props) => {
  const dispatch = useDispatch();

  const skills_redux: SkillsState[] = useSelector(
    (state: RootState) => state.skills
  );
  const skill = skills_redux.find((each) => each.index === index);

  const [skillName, setSkillName] = useState("");

  //---------------ADD/DELETE-------------------
  const addskill = () => {
    const skillIndex = shortenUUID(uuidv4());
    // update the Redux Store
    dispatch(
      addSkill({ index: index, skillIndex: skillIndex, skill: skillName })
    );
    //clear the useState of "skillName"
    setSkillName("");
  };

  const deleteskill = (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteSkill({ index: index, skillIndex: received }));
    // //update the useState of "row"
    // const after_remove = row.filter((each: any) => each.key !== received);
    // editRow(after_remove);
  };
  //***/

  return (
    <Card interactive={false} style={{ background: "gray", color: "white" }}>
      <h3>
        {skill?.term} {index}
      </h3>

      <InputGroup
        onChange={(e) =>
          dispatch(editTermName({ index: index, term: e.target.value }))
        }
      />

      <Button icon="insert" onClick={addskill} />
      <InputGroup
        onChange={(e) => setSkillName(e.target.value)}
        value={skillName}
      />

      {skill?.Skill_list?.map((each: any, i: number) => (
        <div key={i}>
          <div>{each.skill}</div>
          <div>{each.skillIndex}</div>

          <Button
            icon="delete"
            onClick={(e) => deleteskill(e, each.skillIndex)}
          />
          <InputGroup
            onChange={(e) =>
              dispatch(
                editSkillName({
                  index: index,
                  skillIndex: each.skillIndex,
                  skill: e.target.value,
                })
              )
            }
            value={each ? each?.skill : ""}
          />
        </div>
      ))}
    </Card>
  );
};

//*         Important Info.       */
// Child Component: TermComp
//Parent Component: X
export default function InsertSkills({ data }: any) {
  const dispatch = useDispatch();

  const skills_redux: SkillsState[] = useSelector(
    (state: RootState) => state.skills
  );

  const [terms, editTerms] = useState<any>([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    dispatch(cleanUp_Skill_redux())
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: any) => {
        dispatch(initialize_SkillData(each));
      });
    }
  }, []);

  useEffect(() => {
    let temp_arr: any[] = [];
    if (skills_redux.length !== 0) {
      skills_redux.map((each) => {
        temp_arr.push(
          <TermComp key={each.index} index={each.index} term={each.term} />
        );
      });
      editTerms(temp_arr);
    }
  }, [skills_redux]);

  //---------------ADD/DELETE-------------------
  const addterm = () => {
    //initialize the "index"
    const uuid = uuidv4();
    const short_id = shortenUUID(uuid);
    // update the Redux Store
    dispatch(addTerm({ index: short_id, term: term }));
    //update the useState of "terms"
    editTerms(
      terms.concat(<TermComp key={short_id} index={short_id} term={term} />)
    );
    setTerm("");
  };

  const deleteterm = async (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteTerm({ index: received }));
    //update the useState of "workExps"
    const after_remove = terms.filter(
      (each: any) => each.props.index !== received
    );
    editTerms(after_remove);
    //delete from the MongoDB
    await fetch(`/api/user/skill/delete`, {
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
    <div className=" border  border-red-300 w-full">
      <Toaster />
      <Button icon="insert" onClick={addterm} />
      <InputGroup onChange={(e) => setTerm(e.target.value)} value={term} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {terms?.map((each: any, i: number) => (
          <div key={i}>
            <Button
              icon="delete"
              onClick={(e) => deleteterm(e, each.props.index)}
            />
            {each}
          </div>
        ))}
      </div>
    </div>
  );
}
