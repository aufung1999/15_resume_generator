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
import {
  SkillsState,
  addskill,
  addTerm,
  deleteTerm,
  editSkillName,
  editTermName,
} from "@/slices/skillsSlice";
import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

type Props = {
  index: string;
  term?: string;
};

//*         Important Info.       */
// Child Component: X
//Parent Component: InsertSkills
const TermComp = ({ index, term }: Props) => {
  const dispatch = useDispatch();

  const skills: SkillsState[] = useSelector((state: RootState) => state.skills);
  const skill = skills.find((each) => each.index === index);

  const [skillName, setSkillName] = useState("");

  const addSkill = () => {
    // update the Redux Store
    dispatch(addskill({ index: index, skill: skillName }));
    //clear the useState of "skillName"
    setSkillName("");
  };

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

      <Button icon="insert" onClick={addSkill} />
      <InputGroup
        onChange={(e) => setSkillName(e.target.value)}
        value={skillName}
      />

      {skill?.skill?.map((each: any) => (
        <div key={index}>
          {each.skill}
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
          />
        </div>
      ))}
    </Card>
  );
};

//*         Important Info.       */
// Child Component: TermComp
//Parent Component: X
export default function InsertSkills() {
  const dispatch = useDispatch();

  const [terms, editTerms] = useState<any>([]);
  const [term, setTerm] = useState("");

  //---------------ADD/DELETE-------------------
  const addterm = () => {
    //initialize the "index"
    const uuid = uuidv4();
    const short_id = shortenUUID(uuid);
    // update the Redux Store
    dispatch(addTerm({ index: terms.length, term: term }));
    //update the useState of "terms"
    editTerms(
      terms.concat(<TermComp key={short_id} index={short_id} term={term} />)
    );
    setTerm("");
  };

  const deleteterm = (e: React.ChangeEvent<any>, received: string) => {
    e.preventDefault();
    // update the Redux Store
    dispatch(deleteTerm({ index: received }));
    //update the useState of "workExps"
    const after_remove = terms.filter(
      (each: any) => each.props.index !== received
    );
    editTerms(after_remove);
  };
  //***/
  return (
    <div>
      <Button icon="insert" onClick={addterm} />
      <InputGroup onChange={(e) => setTerm(e.target.value)} value={term} />
      {terms?.map((each: any, index: number) => (
        <div key={index}>
          <Button
            icon="delete"
            onClick={(e) => deleteterm(e, each.props.index)}
          />
          {each}
        </div>
      ))}
    </div>
  );
}
