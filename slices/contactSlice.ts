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
    editLastName: (state, action: PayloadAction<string>) => {
      state.LastName = action.payload;
    },
    editPhoneNumber: (state, action: PayloadAction<string>) => {
      state.PhoneNumber = action.payload;
    },
    editCountry: (state, action: PayloadAction<string>) => {
      state.Country = action.payload;
    },
    editCity: (state, action: PayloadAction<string>) => {
      state.City = action.payload;
    },
    editState: (state, action: PayloadAction<string>) => {
      state.State = action.payload;
    },
    editZipCode: (state, action: PayloadAction<string>) => {
      state.ZipCode = action.payload;
    },
    editEmail: (state, action: PayloadAction<string>) => {
      state.Email = action.payload;
    },
    editPortfolio: (state, action: PayloadAction<string>) => {
      state.Portfolio = action.payload;
    },
    editLinkedIn: (state, action: PayloadAction<string>) => {
      state.LinkedIn = action.payload;
    },
    editGitHub: (state, action: PayloadAction<string>) => {
      state.LinkedIn = action.payload;
    },
  },
});

export const {
  editFirstName,
  editLastName,
  editPhoneNumber,
  editCountry,
  editCity,
  editState,
  editZipCode,
  editEmail,
  editPortfolio,
  editLinkedIn,
  editGitHub
} = contactSlice.actions;
export default contactSlice.reducer;
