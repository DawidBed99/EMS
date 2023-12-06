import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./features/employeeSlice";

const store = configureStore({
  reducer: {
    employees: employeeSlice,
  },
});

export default store;
