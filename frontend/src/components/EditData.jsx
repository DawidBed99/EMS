import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EmployeeService from "../service/EmployeeService";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const AddEmployee = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    birthDate: "",
    salary: "",
    address: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const [firstDate, setFirstDate] = useState("")
  useEffect(() => {
    EmployeeService.getEmployeeById(params.id)
      .then((res) => {
        setForm({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          position: res.data.position,
          birthDate: res.data.birthDate,
          salary: res.data.salary,
          address: res.data.address,
        });
        setFirstDate(res.data.birthDate)
      })
      .catch((e) => console.log(e));
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(params.id, form).then(navigate("/"));
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
        Edit Employee
      </Typography>
      <Paper elevation={4} sx={{ width: "30%", padding: "24px" }}>
        <form
          onSubmit={handleEdit}
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
            id="firstName"
            label="First Name"
            value={form.firstName}
            onChange={(e) => updateForm({ firstName: e.target.value })}
          />
          <TextField
            id="lastName"
            label="Last name"
            value={form.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          />
          <TextField
            id="email"
            label="E-mail"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
          <TextField
            id="position"
            label="Position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
          <TextField
            required
            id="birthDate"
            label="Birth Date"
            value={form.birthDate}
            onChange={(e) => updateForm({ birthDate: e.target.value })}
          />
          <TextField
            required
            id="salary"
            label="Salary (PLN)"
            value={form.salary}
            onChange={(e) => updateForm({ salary: e.target.value })}
          />
          <TextField
            required
            id="address"
            label="Address (City)"
            value={form.address}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
           <TextField
            required
            id="date"
            label="Previous Date"
            value={firstDate}
            disabled
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                sx={{ width: "225px" }}
                format="DD.MM.YYYY"
                label="New Date"
                // defaultValue={dayjs(form.birthDate)}
                onChange={(newValue) => {
                  updateForm({
                    birthDate: newValue.$d.toLocaleDateString(),
                  });
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
