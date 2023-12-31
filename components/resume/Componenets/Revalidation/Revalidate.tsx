"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import { Paper, ButtonGroup, Button, Tooltip } from "@mui/material";
import { RootState } from "@/store/store";
import { FORCE_to_UPDATE, editResume_stage_4 } from "@/slices/resumeSlice";
import compare from "@/components/analyze/Functions/compare";
import extractTerms from "@/components/analyze/Functions/extractTerms";
import {
  SkillsState,
  initialize_SkillData,
  update_revalidation,
} from "@/slices/skillsSlice";
import LoadingModal from "./LoadingModal";

export default function Revalidate() {
  const dispatch = useDispatch();
  const router = useRouter();

  const work_unmatches = useSelector(
    (state: RootState) => state.resume.stage_4.work
  );
  const project_unmatches = useSelector(
    (state: RootState) => state.resume.stage_4.project
  );
  const API_Key_redux = useSelector(
    (state: RootState) => state.control.API_KEY
  );

  const work_redux = useSelector((state: RootState) => state.work);
  const projects_redux = useSelector((state: RootState) => state.projects);
  const skills_redux = useSelector((state: RootState) => state.skills);
  //Get the Client API Key from ChatGPT, but stored inDatabase
  const API_KEY = useSelector((state: RootState) => state.control.API_KEY);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("unmatches")) {
        const stage_3_ls: any = localStorage.getItem("stage_3");
        work_redux.map((each: any) =>
          each.JobDescription?.map((each_2: any) =>
            JSON.parse(stage_3_ls)?.some(
              (item: any) =>
                //index
                // each.index === item.match_index_1st &&
                // each_2.rowIndex === item.match_index_2nd
                //or only text
                each_2.Row === item.user_data
            )
              ? null
              : dispatch(
                  editResume_stage_4({
                    index_1st: each.index,
                    index_2nd: each_2.rowIndex,
                    Description: each_2.Row,
                    whichSection: "work",
                  })
                )
          )
        );
      }
    }
  }, [work_redux]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("unmatches")) {
        const stage_3_ls: any = localStorage.getItem("stage_3");
        projects_redux.map((each: any) =>
          each.ProjectDescription?.map((each_2: any) =>
            JSON.parse(stage_3_ls)?.some(
              (item: any) =>
                //index
                // each.index === item.match_index_1st &&
                // each_2.rowIndex === item.match_index_2nd
                //or only text
                each_2.Row === item.user_data
            )
              ? null
              : dispatch(
                  editResume_stage_4({
                    index_1st: each.index,
                    index_2nd: each_2.rowIndex,
                    Techniques: each.Techniques,
                    Description: each_2.Row,
                    whichSection: "project",
                  })
                )
          )
        );
      }
    }
  }, [projects_redux]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("unmatches")) {
        const stage_3_ls: any = localStorage.getItem("stage_3");
        skills_redux?.map((each: any) =>
          each?.Skill_list?.map((each_2: any) =>
            JSON.parse(stage_3_ls)?.some(
              (item: any) =>
                each.index === item.match_index_1st &&
                each_2.skillIndex === item.match_index_2nd
            )
              ? null
              : dispatch(
                  editResume_stage_4({
                    index_1st: each.index,
                    index_2nd: each_2.skillIndex,
                    Description: each_2.skill,
                    whichSection: "skill",
                  })
                )
          )
        );
      }
    }
  }, [skills_redux]);

  const SkillRevalidateHandler = async () => {
    setLoading(true);

    let temp_skill: any[] = [];
    let data: any;

    skills_redux.map((each: any) =>
      temp_skill.push({
        index: each.index,
        array: each.Skill_list,
      })
    );

    if (typeof window !== "undefined") {
      if (localStorage.getItem("unmatches")) {
        const unmatches_ls: any = localStorage.getItem("unmatches");
        const matches_ls: any = localStorage.getItem("matches");

        let fetch_stage_2: any[] = [];

        JSON.parse(unmatches_ls).map((each: string, index: number) =>
          fetch_stage_2.push({
            index: each,
            array: extractTerms(each, "input"),
          })
        );
        JSON.parse(matches_ls).map((each: string, index: number) =>
          fetch_stage_2.push({
            index: each,
            array: extractTerms(each, "input"),
          })
        );

        // console.log(fetch_stage_2);

        data = compare(temp_skill, fetch_stage_2, "skill");
      }
    }
    if (data) {
      console.log(data);

      const unmatches_ls: any = localStorage.getItem("unmatches");
      const matches_ls: any = localStorage.getItem("matches");
      const stage_3_ls: any = localStorage.getItem("stage_3");

      //Process
      const unmatches_revalidated: any[] = JSON.parse(unmatches_ls)?.filter(
        (each: any) =>
          data?.find((each_each: any) => each_each.match_sentence === each)
            ?.match_sentence !== each
      );
      console.log(unmatches_revalidated);

      const matches_revalidated: any[] = JSON.parse(matches_ls)?.filter(
        (each: any) =>
          data?.find((each_each: any) => each_each.match_sentence === each)
            ?.match_sentence === each
      );
      console.log(matches_revalidated);

      // update the fetch object for localStorage of "matches_ls"
      const matches_ls_revalidated = [
        ...JSON.parse(matches_ls),
        ...matches_revalidated,
      ];
      const unmatches_ls_revalidated = unmatches_revalidated;
      const stage_3_ls_revalidated = [...JSON.parse(stage_3_ls), ...data];

      console.log(matches_ls_revalidated);
      console.log(unmatches_ls_revalidated);
      console.log(stage_3_ls_revalidated);

      //update the localStorage of "matches", "unmatches", and "stage_3"
      localStorage.setItem("stage_3", JSON.stringify(stage_3_ls_revalidated));

      //store the "matches" from chatgpt / other algorithms to localStorage
      localStorage.setItem("matches", JSON.stringify(matches_ls_revalidated));

      //store the "unmatches" from chatgpt / other algorithms to localStorage
      localStorage.setItem(
        "unmatches",
        JSON.stringify(unmatches_ls_revalidated)
      );

      //Update the index of
      skills_redux?.map((each: SkillsState) =>
        dispatch(update_revalidation(each))
      );
      //After everything update the Client side page
    }
    dispatch(FORCE_to_UPDATE(JSON.stringify(Date())));
    setLoading(false);
  };

  const WorkRevalidateHandler = async () => {
    setLoading(true);

    if (typeof window !== "undefined") {
      // get the "unmatches" from the localStorage
      if (localStorage.getItem("unmatches")) {
        const unmatches_ls: any = localStorage.getItem("unmatches");
        const matches_ls: any = localStorage.getItem("matches");

        // Define the input object for fetching
        const fetch_data = {
          user_data: work_unmatches,
          input_data: [...JSON.parse(unmatches_ls), ...JSON.parse(matches_ls)],
          API_KEY: API_KEY,
        };
        // ----result from the chatgpt API
        const res = await fetch("/api/chatgpt/work", {
          method: "POST",
          body: JSON.stringify(fetch_data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const { data, total_usage } = await res.json();
        // Update the localStorage after revalidation
        if (data) {
          const stage_3_ls: any = localStorage.getItem("stage_3");

          //Process
          const unmatches_revalidated: any[] = JSON.parse(unmatches_ls)?.filter(
            (each: any) =>
              data.find((each_each: any) => each_each.match_sentence === each)
                ?.match_sentence !== each
          );

          const matches_revalidated: any[] = JSON.parse(unmatches_ls)?.filter(
            (each: any) =>
              data.find((each_each: any) => each_each.match_sentence === each)
                ?.match_sentence === each
          );

          // update the fetch object for localStorage of "matches_ls"
          const matches_ls_revalidated = [
            ...JSON.parse(matches_ls),
            ...matches_revalidated,
          ];
          const unmatches_ls_revalidated = unmatches_revalidated;
          const stage_3_ls_revalidated = [...JSON.parse(stage_3_ls), ...data];

          //update the localStorage of "matches", "unmatches", and "stage_3"
          localStorage.setItem(
            "stage_3",
            JSON.stringify(stage_3_ls_revalidated)
          );

          //store the "matches" from chatgpt / other algorithms to localStorage
          localStorage.setItem(
            "matches",
            JSON.stringify(matches_ls_revalidated)
          );

          //store the "unmatches" from chatgpt / other algorithms to localStorage
          localStorage.setItem(
            "unmatches",
            JSON.stringify(unmatches_ls_revalidated)
          );
          //Update total_usage
          const total_usage_ls = localStorage.getItem("total_usage");
          const total_usage_ls_revalidated =
            Number(total_usage_ls) + Number(total_usage);
          localStorage.setItem(
            "total_usage",
            JSON.stringify(total_usage_ls_revalidated)
          );

          //After everything update the Client side page
          router.refresh();
        }
      }
    }
    dispatch(FORCE_to_UPDATE(JSON.stringify(Date())));
    setLoading(false);
  };
  const ProjectRevalidateHandler = async () => {
    setLoading(true);

    if (typeof window !== "undefined") {
      // get the "unmatches" from the localStorage
      if (localStorage.getItem("unmatches")) {
        const unmatches_ls: any = localStorage.getItem("unmatches");
        const matches_ls: any = localStorage.getItem("matches");

        // Define the input object for fetching
        const fetch_data = {
          user_data: project_unmatches,
          input_data: [...JSON.parse(unmatches_ls), ...JSON.parse(matches_ls)],
          API_KEY: API_KEY,
        };
        // ----result from the chatgpt API
        const res = await fetch("/api/chatgpt/project", {
          method: "POST",
          body: JSON.stringify(fetch_data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const { data_project: data, total_usage_project: total_usage } =
          await res.json();
        // Update the localStorage after revalidation
        if (data) {
          const matches_ls: any = localStorage.getItem("matches");
          const stage_3_ls: any = localStorage.getItem("stage_3");

          //Process
          const unmatches_revalidated: any[] = JSON.parse(unmatches_ls)?.filter(
            (each: any) =>
              data.find((each_each: any) => each_each.match_sentence === each)
                ?.match_sentence !== each
          );

          const matches_revalidated: any[] = JSON.parse(unmatches_ls)?.filter(
            (each: any) =>
              data.find((each_each: any) => each_each.match_sentence === each)
                ?.match_sentence === each
          );

          // update the fetch object for localStorage of "matches_ls"
          const matches_ls_revalidated = [
            ...JSON.parse(matches_ls),
            ...matches_revalidated,
          ];
          const unmatches_ls_revalidated = unmatches_revalidated;
          const stage_3_ls_revalidated = [...JSON.parse(stage_3_ls), ...data];

          //update the localStorage of "matches", "unmatches", and "stage_3"
          localStorage.setItem(
            "stage_3",
            JSON.stringify(stage_3_ls_revalidated)
          );

          //store the "matches" from chatgpt / other algorithms to localStorage
          localStorage.setItem(
            "matches",
            JSON.stringify(matches_ls_revalidated)
          );

          //store the "unmatches" from chatgpt / other algorithms to localStorage
          localStorage.setItem(
            "unmatches",
            JSON.stringify(unmatches_ls_revalidated)
          );
          //Update total_usage
          const total_usage_ls = localStorage.getItem("total_usage");
          const total_usage_ls_revalidated =
            Number(total_usage_ls) + Number(total_usage);
          localStorage.setItem(
            "total_usage",
            JSON.stringify(total_usage_ls_revalidated)
          );
          //After everything update the Client side page
          router.refresh();
        }
      }
    }
    dispatch(FORCE_to_UPDATE(JSON.stringify(Date())));
    setLoading(false);
  };

  const ProjectTechniqueRevalidateHandler = async () => {
    setLoading(true);

    if (typeof window !== "undefined") {
      // get the "unmatches" from the localStorage
      if (localStorage.getItem("unmatches")) {
        const unmatches_ls: any = localStorage.getItem("unmatches");
        const matches_ls: any = localStorage.getItem("matches");

        let fetch_stage_2: any[] = [];

        let combined_array: string[] = [
          ...JSON.parse(unmatches_ls),
          ...JSON.parse(matches_ls),
        ];

        combined_array.map((each, index) =>
          fetch_stage_2.push({
            index: each,
            array: extractTerms(each, "input"),
          })
        );

        console.log(combined_array);

        // Define the input object for fetching
        let temp_project: any[] = [];
        project_unmatches.map((each: any) =>
          temp_project.push({
            index: each.index_1st,
            array: extractTerms(each?.Techniques, "project_redux"),
          })
        );

        let compare_res_project: any = compare(
          temp_project,
          fetch_stage_2,
          "project"
        );

        const data = compare_res_project;

        // Update the localStorage after revalidation
        if (data) {
          const matches_ls: any = localStorage.getItem("matches");
          const stage_3_ls: any = localStorage.getItem("stage_3");

          //Process
          const unmatches_revalidated: any[] = JSON.parse(unmatches_ls)?.filter(
            (each: any) =>
              data.find((each_each: any) => each_each.match_sentence === each)
                ?.match_sentence !== each
          );

          const matches_revalidated: any[] = JSON.parse(unmatches_ls)?.filter(
            (each: any) =>
              data.find((each_each: any) => each_each.match_sentence === each)
                ?.match_sentence === each
          );

          // update the fetch object for localStorage of "matches_ls"
          const matches_ls_revalidated = [
            ...JSON.parse(matches_ls),
            ...matches_revalidated,
          ];
          const unmatches_ls_revalidated = unmatches_revalidated;
          const stage_3_ls_revalidated = [...JSON.parse(stage_3_ls), ...data];

          //update the localStorage of "matches", "unmatches", and "stage_3"
          localStorage.setItem(
            "stage_3",
            JSON.stringify(stage_3_ls_revalidated)
          );

          //store the "matches" from chatgpt / other algorithms to localStorage
          localStorage.setItem(
            "matches",
            JSON.stringify(matches_ls_revalidated)
          );

          //store the "unmatches" from chatgpt / other algorithms to localStorage
          localStorage.setItem(
            "unmatches",
            JSON.stringify(unmatches_ls_revalidated)
          );

          //After everything update the Client side page
          router.refresh();
        }
      }
    }
    dispatch(FORCE_to_UPDATE(JSON.stringify(Date())));
    setLoading(false);
  };

  //----------------Side Bar---------------------------------
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={
        "bg-white px-3 py-1 cursor-pointer top-0 rounded border-2  border-green-500 "
      }
    >
      {/* Conditionally render the LoadingModal */}
      <LoadingModal loading={loading} />

      <div className=" bg-white inline-block">
        <div>Revalidation</div>

        <ButtonGroup aria-label=" elevation buttons " className="flex flex-col">
          <Button onClick={SkillRevalidateHandler}>Skill</Button>
          <Button onClick={WorkRevalidateHandler}>Work</Button>
          <Button onClick={ProjectRevalidateHandler}>Project</Button>
          <Button onClick={ProjectTechniqueRevalidateHandler}>Technique</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
