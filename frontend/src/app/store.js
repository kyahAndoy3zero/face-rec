import { configureStore } from "@reduxjs/toolkit";
import personReducer from "../features/persons/personSlice";

export const store = configureStore({
  reducer: {
    persons: personReducer,
  },
});
