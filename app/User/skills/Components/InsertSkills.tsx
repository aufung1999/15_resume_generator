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
  deleteSkill,
  deleteTerm,
  editSkillName,
  editTermName,
} from "@/slices/skillsSlice";
import { RootState } from "@/store/store";

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

import useSWR from "swr";

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
          />
        </div>
      ))}
    </Card>
  );
};

//*         Important Info.       */
// Child Component: TermComp
//Parent Component: X
export default function InsertSkills({data}) {
  const dispatch = useDispatch();

  const skills: SkillsState[] = useSelector((state: RootState) => state.skills);

  const [terms, editTerms] = useState<any>([]);
  const [term, setTerm] = useState("");

  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error, isLoading } = useSWR("/api/user/skill", fetcher);
  //fetch data from the collection of "Skills" from Database at the initial stage
  useEffect(() => {
    let temp_arr: any[] = [];
    const getData = async () => {
      data?.map((each: SkillsState) => {
        //---After receive data from MongoDB, dispatch to Redux
        dispatch(addTerm({ index: each.index }));
        dispatch(editTermName({ index: each.index, term: each.term }));

        each.Skill_list?.map((row) => {
          dispatch(addSkill({ index: each.index, skillIndex: row.skillIndex }));
          dispatch(
            editSkillName({
              index: each.index,
              skillIndex: row.skillIndex,
              skill: row.skill,
            })
          );
        });
        //this is the part where it Generate the Fetched data from MongoDB to Frontend
        temp_arr.push(
          <TermComp key={each.index} index={each.index} term={each.term} />
        );
      });
    };
    getData();

    //this is the part where it Generate the Fetched data from MongoDB to Frontend
    editTerms(temp_arr);
  }, [data]);

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
      {console.log("terms: " + JSON.stringify(terms, null, 1))}
      <Button icon="insert" onClick={addterm} />
      <InputGroup onChange={(e) => setTerm(e.target.value)} value={term} />
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
  );
}
