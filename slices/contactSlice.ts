import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ContactState {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Country: string;
  City: string;
  State: string;
  ZipCode: string;
  Email: string;
  Portfolio: string;
  LinkedIn: string;
}

const initialState: ContactState = {
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  Country: "",
  City: "",
  State: "",
  ZipCode: "",
  Email: "",
  Portfolio: "",
  LinkedIn: "",
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    editFirstName: (state, action: PayloadAction<string>) => {
      state.FirstName = action.payload;
    },
    // decrement: (state) => {
    //   state.value--;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    // decrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value -= action.payload;
    // },
  },
});

export const { editFirstName } = contactSlice.actions;
export default contactSlice.reducer;
