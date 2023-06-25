import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  GitHub: string;
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
  GitHub: "",
};

// const getPosts = createAsyncThunk(
//   "posts/getPosts",

//   async (
//     arg,
//     { dispatch, getState, extra, requestId, signal, rejectWithValue }
//   ) => {
//     return fetch(
//       `https://jsonplaceholder.typicode.com/posts?_limit=${arg.limit}`
//     )
//       .then((res) => {
//         if (!res.ok) {
//           return rejectWithValue([], "api url not found from");
//         }
//         return res.json();
//       })
//       .catch((error) => {
//         return rejectWithValue([], error);
//       });
//   }
// );

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    initialize_ClientData: (state, action: PayloadAction<string>) => {
      const {
        FirstName,
        LastName,
        PhoneNumber,
        Country,
        City,
        State,
        ZipCode,
        Email,
        Portfolio,
        LinkedIn,
        GitHub,
      } = action.payload;

      state.FirstName = FirstName;
      state.LastName = LastName;
      state.PhoneNumber = PhoneNumber;
      state.Country = Country;
      state.City = City;
      state.State = State;
      state.ZipCode = ZipCode;
      state.Email = Email;
      state.Portfolio = Portfolio;
      state.LinkedIn = LinkedIn;
      state.GitHub = GitHub;
    },
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
      state.GitHub = action.payload;
    },
  },
  // extraReducers: {
  //   [getPosts.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [getPosts.fulfilled]: (state, { payload, meta }) => {
  //     state.list_remarks = payload;
  //     state.status = "success";
  //   },
  //   [getPosts.rejected]: (state, action) => {
  //     state.status = "failed";
  //   },
  // },
});

export const {
  initialize_ClientData,
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
  editGitHub,
} = contactSlice.actions;
export default contactSlice.reducer;
