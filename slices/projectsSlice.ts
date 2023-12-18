import extractTerms from "@/components/analyze/Functions/extractTerms";
import { Stage_3_project } from "@/utils/interfaces";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProjectState {
  index: string;
  ProjectName: string;
  Techniques?: string;
  ProjectDescription: { rowIndex: string; Row?: string; HTML?: string }[];
  Link?: string;
  GithubLink?: string;
  display_in_Resume?: boolean;
}

export interface ProjectDescription {
  rowIndex: string;
  Row?: string;
  HTML?: string;
}

const initialState: ProjectState[] = [];

const projectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    cleanUp_Project_redux: () => initialState,
    initialize_ProjectData: (state, action: PayloadAction<ProjectState>) => {
      const {
        index,
        ProjectName,
        Techniques,
        ProjectDescription,
        Link,
        GithubLink,
      } = action.payload;
      //if the "stage_3" data exists
      let stage_3_exist = false;
      //get the index from "stage_3"
      let match_index: any[] = [];

      if (typeof window !== "undefined") {
        //localStorage.getItem("stage_3") Exisit
        if (localStorage.getItem("stage_3")) {
          stage_3_exist = true;
          const stage_3_ls: any = localStorage.getItem("stage_3");
          JSON.parse(stage_3_ls)?.map((each: Stage_3_project) => {
            //1. Check the technique
            each.match_index_1st === index &&
              extractTerms(Techniques, "project_redux")?.includes(
                each.technique
              ) &&
              match_index.push({ match_index_1st: index }),
              //2. Check the description
              ProjectDescription?.map((item: ProjectDescription) => {
                each.match_index_1st === index &&
                  each.match_index_2nd === item.rowIndex &&
                  match_index.push({
                    match_index_1st: index,
                    match_index_2nd: item.rowIndex,
                  }),
                  item.HTML === undefined || item.HTML === null
                    ? (item.HTML = item.Row)
                    : null;
              });
          });

          //set the data format
          let Data = {
            index: index,
            ProjectName: ProjectName,
            Techniques: Techniques,
            ProjectDescription: ProjectDescription,
            Link: Link,
            GithubLink: GithubLink,
            display_in_Resume: false,
          };
          //-------------------------------------------------------------------------------
          //Condition add to array,
          //"unshift" is to add at the beginning:
          //"push" is to add at the end

          ProjectDescription?.map((each: ProjectDescription) =>
            match_index?.some(
              (item: {
                match_index?: string;
                match_index_1st?: string;
                match_index_2nd?: string;
              }) =>
                // no:1
                item?.match_index_1st === index ||
                item?.match_index_2nd === each.rowIndex
            )
              ? (Data.display_in_Resume = true)
              : null
          );
          //-------------------------------------------------------------------------------
          Data?.display_in_Resume === true
            ? state.unshift(Data)
            : state.push(Data);
        }

        //localStorage.getItem("stage_3") DOES NOT Exisit----------------------------------------
        if (!localStorage.getItem("stage_3")) {
          //set the data format
          let Data = {
            index: index,
            ProjectName: ProjectName,
            Techniques: Techniques,
            ProjectDescription: ProjectDescription,
            Link: Link,
            GithubLink: GithubLink,
            display_in_Resume: false,
          };

          //-------------------------------------------------------------------------------
          state.push(Data);
        }
      }
    },
    addProject: (state, action) => {
      const { index } = action.payload;
      state.push(action.payload);
    },
    deleteProject: (state, action) => {
      const { index } = action.payload;
      // console.log("Redux index: " + index);

      state.splice(
        state.findIndex((arrow) => arrow.index === index),
        1
      );
    },
    editProjectName: (state, action) => {
      const { index, ProjectName } = action.payload;
      const Project = state.find((each) => each.index === index);
      if (Project) {
        Project.ProjectName = ProjectName;
      }
    },
    editTechniques: (state, action) => {
      const { index, Techniques } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        Project.Techniques = Techniques;
      }
    },
    editLink: (state, action) => {
      const { index, Link } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        Project.Link = Link;
      }
    },
    editGithubLink: (state, action) => {
      const { index, GithubLink } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        Project.GithubLink = GithubLink;
      }
    },
    addrow: (state, action) => {
      const { index, rowIndex } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        if (Project.ProjectDescription === undefined) {
          Project.ProjectDescription = [];
        }
        Project.ProjectDescription.push({ rowIndex: rowIndex });
      }
    },
    deleterow: (state, action) => {
      const { index, rowIndex } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        if (Project.ProjectDescription === undefined) {
          // intialize the state of ProjectDescription
          Project.ProjectDescription = [];
        }
        // Project.ProjectDescription.push({ rowIndex: rowIndex });
        Project.ProjectDescription.splice(
          Project.ProjectDescription.findIndex(
            (arrow) => arrow.rowIndex === rowIndex
          ),
          1
        );
      }
    },
    editProjectDescription: (state, action) => {
      const { index, rowIndex, Row, HTML } = action.payload;
      let Project = state.find((each) => each.index === index);
      if (Project) {
        if (Project.ProjectDescription === undefined) {
          Project.ProjectDescription = [];
        }

        const target_row = Project.ProjectDescription.find(
          (each) => each.rowIndex === rowIndex
        );
        if (target_row) {
          target_row.Row = Row;
          target_row.HTML = HTML;
        }
      }
    },
    switch_display_in_Resume: (state, action) => {
      const { index, display_in_Resume } = action.payload;
      const Project = state.find((each) => each.index === index);
      if (Project) {
        Project.display_in_Resume = display_in_Resume;
      }
    },
    drag_drop: (state, action) => {
      const { result } = action.payload;
      // console.log("result: " + JSON.stringify(result.draggableId, null, 1));
      // console.log("result: " + JSON.stringify(result.source.index, null, 1));
      // console.log("state: " + JSON.stringify(state, null, 1));
      const [reorderedItem] = state.splice(result.source.index, 1);
      state.splice(result.destination.index, 0, reorderedItem);
    },
    move_up: (state, action) => {
      const { index } = action.payload;

      let Project_Index = state.findIndex((each) => each.index === index);
      const [reorderedItem] = state.splice(index, 1);

      state.splice(Project_Index + 1, 0, reorderedItem);
    },
    move_down: (state, action) => {
      const { index } = action.payload;

      let Project_Index = state.findIndex((each) => each.index === index);
      const [reorderedItem] = state.splice(index, 1);

      state.splice(Project_Index + 1, 0, reorderedItem);
    },
  },
});

export const {
  cleanUp_Project_redux,
  initialize_ProjectData,
  addProject,
  deleteProject,
  editProjectName,
  editTechniques,
  editLink,
  editGithubLink,
  addrow,
  deleterow,
  editProjectDescription,
  switch_display_in_Resume,
  drag_drop,
  move_up,
  move_down,
} = projectsSlice.actions;
export default projectsSlice.reducer;
