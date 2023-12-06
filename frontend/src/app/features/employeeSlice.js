import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: null,
  loading: true,
  singleItem: [],
  pageNumber: null,
};

export const employeesFetch = createAsyncThunk(
  "employees/employeesFetch",
  async (quantity) => {
    // console.log(quantity);
    const response = await axios.get(
      `http://localhost:8080/employee/pagination/pageNumber=0/quantity=${quantity}/sortBy=id/sortDir=asc`
    );
    // console.log(response.data);
    return response?.data;
  }
);
export const employeesFetchSort = createAsyncThunk(
  "employees/employeesFetch",
  async (field) => {
    // console.log(field);
    const response = await axios.get(
      `http://localhost:8080/employee/pagination/pageNumber=${field.pageNumber}/quantity=${field.quantity}/sortBy=${field.field}/sortDir=${field.dir}`
    );
    return response?.data;
  }
);

export const employeesDelete = createAsyncThunk(
  "employees/employeesDelete",
  async (id) => {
    const response = await axios.delete(`http://localhost:8080/employee/${id}`);
    // console.log(response);
    return id;
  }
);

export const employeesAdd = createAsyncThunk(
  "employees/employeesAdd",
  async (data) => {
    const response = await axios.post(`http://localhost:8080/employee`, data);
    console.log(response);
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: {
    //Get list of employees
    [employeesFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [employeesFetch.fulfilled]: (state, action) => {
      state.status = "success";
      // console.log(action.payload.content);
      state.items = action.payload.content;
      state.pageNumber = action.payload.number;
      state.totalPages = action.payload.totalPages;
      state.size = action.payload.size;
      state.loading = false;
    },
    [employeesFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },

    //Delete employee
    [employeesDelete.pending]: (state, action) => {
      state.status = "pending";
    },
    [employeesDelete.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = state.items.filter((el) => el.id !== action.payload);
      console.log(action.payload);
      state.loading = false;
    },
    [employeesDelete.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default employeesSlice.reducer;
