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
import { usePathname } from "next/navigation";

type Props = {
  index: string;
  data: any;
};

//*         Important Info.       */
// Child Component: X
//Parent Component: InsertSkills
const TermComp = ({ index, data }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const dispatch = useDispatch();

  const skills_redux: SkillsState[] = useSelector(
    (state: RootState) => state.skills
  );
  const skill = skills_redux.find((each) => each.index === index);

  const [skillName, setSkillName] = useState("");

  useEffect(() => {
    //Copy the "initialized" data from the database
    setCopy(skill);
    setRemind(false);
  }, [data]);
  //---------------------------To check if it equals to the data fetched from the database, if not UPDATE-------------------------------------------------------
  const [copyData, setCopy] = useState<any | null>(null);
  const [remind, setRemind] = useState(false);

  //Copy the "initialized" data from the database
  useEffect(() => {
    if (copyData) {
      //if LEFT and RIGHT sides are equal -> no NEED to update data in database
      JSON.stringify(copyData) === JSON.stringify(skill)
        ? setRemind(false)
        : setRemind(true);
    }
  }, [skill]);

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

  //---------------Save to Server-------------------
  const SubmitHandler = () => {
    fetch("/api/user/skill", {
      //add this route later
      method: "POST",
      body: JSON.stringify(skill),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Skills Updated!"))
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
      {/* hide the index */}
      <h3>
        {skill?.term}
        {/* {index} */}
      </h3>

      <div className="mb-3">
        <InputGroup
          onChange={(e) =>
            dispatch(editTermName({ index: index, term: e.target.value }))
          }
        />
      </div>

      {skill?.Skill_list?.map((each: any, i: number) => (
        <div key={i}>
          <div>{each.skill}</div>
          {/* hide the index */}
          {/* <div>{each.skillIndex}</div> */}

          <div className="flex relative">
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
              fill
            />

            <Button
              style={{
                backgroundColor: "rgba(255,0,0,0.6)",
                borderRadius: "25% 10%",
              }}
              className="absolute top-0 right-0 "
              onClick={(e) => deleteskill(e, each.skillIndex)}
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
          </div>
        </div>
      ))}
      <div className="flex mt-5 flex-col w-full">
        <InputGroup
          fill
          onChange={(e) => setSkillName(e.target.value)}
          value={skillName}
        />
        <Button
          icon={<Icon icon="insert" className="" style={{ color: "white" }} />}
          onClick={addskill}
          style={{
            backgroundColor: "rgba(0,120,255,1)",
          }}
          small
        />
        {remind && (
          <Button className="" intent="warning" onClick={SubmitHandler}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

//*         Important Info.       */
// Child Component: TermComp
//Parent Component: X
export default function InsertSkills({ data }: any) {
  const pathname = usePathname();

  const dispatch = useDispatch();

  const skills_redux: SkillsState[] = useSelector(
    (state: RootState) => state.skills
  );

  const [terms, editTerms] = useState<any>([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    dispatch(cleanUp_Skill_redux());
    if (data) {
      // console.log("data: " + JSON.stringify(data, null, 1));
      data.map((each: any) => {
        dispatch(initialize_SkillData(each));
      });
    }
  }, [data]);

  useEffect(() => {
    let temp_arr: any[] = [];
    if (skills_redux.length !== 0) {
      skills_redux.map((each) => {
        temp_arr.push(
          <TermComp key={each.index} index={each.index} data={data} />
        );
      });
      editTerms(temp_arr);
    }
  }, [skills_redux, data]);

  //---------------ADD/DELETE-------------------
  const addterm = () => {
    //initialize the "index"
    const uuid = uuidv4();
    const short_id = shortenUUID(uuid);
    // update the Redux Store
    dispatch(addTerm({ index: short_id, term: term }));
    //update the useState of "terms"
    editTerms(
      terms.concat(<TermComp key={short_id} index={short_id} data={data} />)
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
    <div className={" border  border-red-300 w-full"}>
      <Toaster />

      <div
        className={`
          grid grid-cols-1 border border-green-300 ${
            pathname.split("/").includes("user")
              ? "  grid-cols-3 gap-3 w-full "
              : "" + pathname.split("/").includes("resume")
              ? " w-full "
              : ""
          }
        `}
      >
        {terms?.map((each: any, i: number) => (
          <div key={i} className="w-full border-2 border-green-300 ">
            <div className="flex relative">
              <div className="w-full">{each}</div>
              <Button
                className="absolute top-0 right-0 "
                style={{
                  backgroundColor: "rgba(255,0,0,0.6)",
                  borderRadius: "25% 10%",
                }}
                onClick={(e) => deleteterm(e, each.props.index)}
              >
                <Icon icon="delete" className="" style={{ color: "white" }} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex-col px-20 ">
        <InputGroup onChange={(e) => setTerm(e.target.value)} value={term} />

        <Button
          icon={<Icon icon="insert" className="" style={{ color: "white" }} />}
          onClick={addterm}
          fill
          style={{
            backgroundColor: "rgba(0,120,255,1)",
          }}
        />
      </div>
    </div>
  );
}
