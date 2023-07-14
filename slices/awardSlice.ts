import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AwardState {
  index: string;
  AwardName: string;
  AwardBy: string;
  Date: string;
  AwardDescription: string;
}

const initialState: AwardState[] = [];

const awardSlice = createSlice({
  name: "awards",
  initialState,
  reducers: {
    cleanUp_Award_redux:() => initialState,
    initialize_AwardData: (state, action: PayloadAction<string>) => {
      const { index, AwardName, AwardBy, Date, AwardDescription }: any =
        action.payload;
      //set the data format
      let Data = {
        index: index,
        AwardName: AwardName,
        AwardBy: AwardBy,
        Date: Date,
        AwardDescription: AwardDescription,
      };
      //push the tidied up data into state
      state.push(Data);
    },
    addAward: (state, action) => {
      state.push(action.payload);
    },
    deleteAward: (state, action) => {
      const { index } = action.payload;
      state.splice(
        state.findIndex((arrow) => arrow.index === index),
        1
      );
    },
    editAwardName: (state, action) => {
      const { index, AwardName } = action.payload;
      const Award = state.find((each) => each.index === index);
      if (Award) {
        Award.AwardName = AwardName;
      }
    },
    editAwardBy: (state, action) => {
      const { index, AwardBy } = action.payload;
      let Award = state.find((each) => each.index === index);
      if (Award) {
        Award.AwardBy = AwardBy;
      }
    },

    editDate: (state, action) => {
      const { index, Date } = action.payload;
      let Award = state.find((each) => each.index === index);
      if (Award) {
        Award.Date = Date;
      }
    },
    editAwardDescription: (state, action) => {
      const { index, AwardDescription } = action.payload;
      let Award = state.find((each) => each.index === index);
      if (Award) {
        Award.AwardDescription = AwardDescription;
      }
    },
  },
});

export const {
  cleanUp_Award_redux,
  initialize_AwardData,
  addAward,
  deleteAward,
  editAwardName,
  editAwardBy,
  editDate,
  editAwardDescription,
} = awardSlice.actions;
export default awardSlice.reducer;
