import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { employeesAdd } from "../app/features/employeeSlice";
import { useState } from "react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    salary: "",
    address: "",
    birthDate: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(employeesAdd(form)).then(navigate("/"));
    console.log(form);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        paddingTop: "10px",
        paddingBottom: "120px",
      }}
    >
      <Typography padding="20px" variant="h2">
        Add new Employee
      </Typography>

      <Paper elevation={4} sx={{ width: "30%", padding: "24px" }}>
        <form
          onSubmit={handleAdd}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <Typography variant="h4" paddingBottom="20px">
            Employee Data
          </Typography>
          <TextField
            required
            id="firstName"
            label="First name"
            onChange={(e) => updateForm({ firstName: e.target.value })}
          />
          <TextField
            required
            id="lastName"
            label="Last name"
            onChange={(e) => updateForm({ lastName: e.target.value })}
          />
          <TextField
            required
            id="email"
            label="E-mail"
            onChange={(e) => updateForm({ email: e.target.value })}
          />
          <TextField
            required
            id="position"
            label="Position"
            onChange={(e) => updateForm({ position: e.target.value })}
          />

          <TextField
            required
            id="salary"
            label="Salary (PLN)"
            onChange={(e) => updateForm({ salary: e.target.value })}
          />
          <TextField
            required
            id="address"
            label="Address (City)"
            onChange={(e) => updateForm({ address: e.target.value })}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={{ width: "225px" }}
                format="DD.MM.YYYY"
                onChange={(newValue) => {
                  updateForm({
                    birthDate: newValue.$d.toLocaleDateString(),
                  });
                  console.log(newValue.$d.toLocaleDateString());
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="success">
              Save data
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddEmployee;
