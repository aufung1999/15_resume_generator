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
  addskill,
  addterm,
  editSkillName,
  editTermName,
} from "@/slices/skillsSlice";
import { RootState } from "@/store/store";

type Props = {
  index: number;
  term?: string;
};

const TermComp = ({ index, term }: Props) => {
  const dispatch = useDispatch();

  const skills = useSelector((state: RootState) => state.skills);

  const [skillName, setSkillName] = useState("");

  const addSkill = () => {
    dispatch(addskill({ index: index, skill: skillName }));
    setSkillName("");
  };

  return (
    <Card interactive={false} style={{ background: "gray", color: "white" }}>
      <h3>
        {skills[index]?.term} {index}
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

      {skills[index].skill?.map((each: any) => (
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

export default function InsertSkills() {
  const dispatch = useDispatch();

  const [links, insertLinks] = useState<any>([]);
  const [term, setTerm] = useState("");

  const addLink = () => {
    dispatch(addterm({ index: links.length, term: term }));
    insertLinks(
      links.concat(
        <TermComp key={links.length} index={links.length} term={term} />
      )
    );
    setTerm("");
  };
  return (
    <div>
      <Button icon="insert" onClick={addLink} />
      <InputGroup onChange={(e) => setTerm(e.target.value)} value={term} />
      {links?.map((each: any, index: number) => (
        <div key={index}>{each}</div>
      ))}
    </div>
  );
}
