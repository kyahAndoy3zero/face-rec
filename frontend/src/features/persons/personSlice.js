import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import personService from "./personService";

const initialState = {
  persons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getPerson = createAsyncThunk(
  'persons/get',
  async (_, thunkAPI) => {
    try {

      return await personService.getProfile()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createPer = createAsyncThunk(
  "persons/create",
  async (personData, thunkAPI) => {
    try {

      return await personService.createPerson(personData);

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const deleteProfile = createAsyncThunk(
  'persons/delete',
  async (id, thunkAPI) => {
    try {
      return await personService.deletePerson(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message);
    }
  }
)




export const personSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.persons.push(action.payload);

      })
      .addCase(createPer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getPerson.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPerson.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.persons = action.payload
      })
      .addCase(getPerson.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.persons = state.persons.filter(
          (person) => person._id !== action.payload.id
        )
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
});

export const { reset } = personSlice.actions;
export default personSlice.reducer;
