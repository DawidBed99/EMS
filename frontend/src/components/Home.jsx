import * as React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import {
  employeesFetch,
  employeesDelete,
  employeesFetchSort,
} from "../app/features/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState("asc");

  const [idBTN, setIDBTN] = useState("black");
  const [fNameBTN, setFNameBTN] = useState("none");
  const [lNameBTN, setLNameBTN] = useState("none");
  const [posBTN, setPosBTN] = useState("none");
  const [salaryBTN, setSalaryBTN] = useState("none");
  const [addressBTN, setAddressBTN] = useState("none");
  const [currField, setCurrField] = useState("id");
  const [birthDateBTN, setbirthDateBTN] = useState("none");

  const [page, setPage] = useState(employees.pageNumber + 1);
  const [quantity, setQuantity] = useState(
    localStorage.getItem("quantity") === null
      ? 5
      : localStorage.getItem("quantity")
  );

  const handleChange = (event) => {
    localStorage.setItem("quantity", event.target.value);
    setQuantity(event.target.value);
  };

  useEffect(() => {
    dispatch(employeesFetch(quantity));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSort = (field) => {
    const data = {
      pageNumber: page - 1,
      field: field,
      dir: sortOrder,
      quantity: quantity,
    };
    dispatch(employeesFetchSort(data));
  };
  useEffect(() => {
    handleSort(currField);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, quantity, sortOrder]);

  const handleDelete = (id) => {
    dispatch(employeesDelete(id));
  };

  const handleSortOrder = () => {
    sortOrder === "asc" ? setSortOrder("desc") : setSortOrder("asc");
  };

  const list = employees.items?.map((person) => {
    return (
      <TableRow key={person.id} sx={{ fontSize: "16px" }}>
        <TableCell
          sx={{
            borderRight: "solid rgba(224, 224, 224, 1) 1px",
          }}
          align="center"
        >
          {person.id}
        </TableCell>
        <TableCell
          sx={{
            borderRight: "solid rgba(224, 224, 224, 1) 1px",
          }}
          align="left"
        >
          {person.firstName}
        </TableCell>
        <TableCell
          sx={{
            borderRight: "solid rgba(224, 224, 224, 1) 1px",
            width: "150px",
          }}
          align="left"
        >
          {person.lastName}
        </TableCell>
        <TableCell
          sx={{
            borderRight: "solid rgba(224, 224, 224, 1) 1px",
            width: "225px",
          }}
          align="left"
        >
          {person.email}
        </TableCell>
        <TableCell
          sx={{
            borderRight: "solid rgba(224, 224, 224, 1) 1px",
          }}
          align="left"
        >
          {person.position}
        </TableCell>
        <TableCell
          sx={{
            borderRight: "solid rgba(224, 224, 224, 1) 1px",
          }}
          align="left"
        >
          {person.salary} PLN
        </TableCell>
        <TableCell
          sx={{
            borderRight: "solid rgba(224, 224, 224, 1) 1px",
          }}
          align="left"
        >
          {person.address}
        </TableCell>
        <TableCell
          sx={{
            borderRight: "solid rgba(224, 224, 224, 1) 1px",
          }}
          align="left"
        >
          {person.birthDate}
        </TableCell>
        <TableCell sx={{ fontSize: "12px" }} align="left">
          <Button
            variant="contained"
            color="warning"
            sx={{ marginRight: "10px" }}
            onClick={() => navigate(`/editEmployee/${person.id}`)}
          >
            <EditIcon />
          </Button>
          <Button
            onClick={() => {
              handleDelete(person.id);
            }}
            variant="contained"
            color="error"
          >
            <Delete />
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        paddingTop: "25px",
        flexDirection: "column",
        paddingBottom: "160px",
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        Employee List
      </Typography>
      <Box>
        <TableContainer
          sx={{ borderRadius: "0", border: "solid rgba(224, 224, 224, 1) 1px" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "solid rgba(224, 224, 224, 1) 1px",
                    background: "rgb(230, 245, 244)",
                  }}
                  align="left"
                >
                  <button
                    className="sortBTN"
                    onClick={() => {
                      handleSortOrder();
                      setIDBTN("black");
                      setFNameBTN("none");
                      setLNameBTN("none");
                      setPosBTN("none");
                      setSalaryBTN("none");
                      setbirthDateBTN("none");
                      setAddressBTN("none");
                      setCurrField("id");
                    }}
                  >
                    ID
                    <span
                      className="arrow"
                      id="id"
                      style={{
                        rotate: sortOrder === "asc" ? "180deg" : "360deg",
                        background: `${idBTN}`,
                      }}
                    />
                  </button>
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "solid rgba(224, 224, 224, 1) 1px",
                    background: "rgb(230, 245, 244)",
                  }}
                  align="left"
                >
                  <button
                    className="sortBTN"
                    onClick={() => {
                      handleSortOrder();
                      setIDBTN("none");
                      setFNameBTN("black");
                      setLNameBTN("none");
                      setPosBTN("none");
                      setSalaryBTN("none");
                      setbirthDateBTN("none");
                      setAddressBTN("none");
                      setCurrField("firstName");
                    }}
                  >
                    First Name
                    <span
                      className="arrow"
                      id="fName"
                      style={{
                        rotate: sortOrder === "asc" ? "180deg" : "360deg",
                        background: `${fNameBTN}`,
                      }}
                    />
                  </button>
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "solid rgba(224, 224, 224, 1) 1px",
                    background: "rgb(230, 245, 244)",
                  }}
                  align="left"
                >
                  <button
                    className="sortBTN"
                    onClick={() => {
                      handleSortOrder();
                      setIDBTN("none");
                      setFNameBTN("none");
                      setLNameBTN("black");
                      setPosBTN("none");
                      setbirthDateBTN("none");
                      setSalaryBTN("none");
                      setAddressBTN("none");
                      setCurrField("lastName");
                    }}
                  >
                    Last Name
                    <span
                      className="arrow"
                      id="lName"
                      style={{
                        rotate: sortOrder === "asc" ? "180deg" : "360deg",
                        background: `${lNameBTN}`,
                      }}
                    />
                  </button>
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "18px",
                    borderRight: "solid rgba(224, 224, 224, 1) 1px",
                    background: "rgb(230, 245, 244)",
                  }}
                  align="left"
                >
                  E-mail
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "solid rgba(224, 224, 224, 1) 1px",
                    background: "rgb(230, 245, 244)",
                  }}
                  align="left"
                >
                  <button
                    className="sortBTN"
                    onClick={() => {
                      handleSortOrder();
                      setIDBTN("none");
                      setFNameBTN("none");
                      setLNameBTN("none");
                      setbirthDateBTN("none");
                      setAddressBTN("none");
                      setSalaryBTN("none");
                      setPosBTN("black");
                      setCurrField("position");
                    }}
                  >
                    Position
                    <span
                      className="arrow"
                      id="position"
                      style={{
                        rotate: sortOrder === "asc" ? "180deg" : "360deg",
                        background: `${posBTN}`,
                      }}
                    />
                  </button>
                </TableCell>

                <TableCell
                  sx={{
                    borderRight: "solid rgba(224, 224, 224, 1) 1px",
                    background: "rgb(230, 245, 244)",
                  }}
                  align="left"
                >
                  <button
                    className="sortBTN"
                    onClick={() => {
                      handleSortOrder();
                      setIDBTN("none");
                      setFNameBTN("none");
                      setLNameBTN("none");
                      setPosBTN("none");
                      setbirthDateBTN("none");
                      setSalaryBTN("black");
                      setAddressBTN("none");
                      setCurrField("salary");
                    }}
                  >
                    Salary
                    <span
                      className="arrow"
                      id="salary"
                      style={{
                        rotate: sortOrder === "asc" ? "180deg" : "360deg",
                        background: `${salaryBTN}`,
                      }}
                    />
                  </button>
                </TableCell>
                <TableCell
                  sx={{ background: "rgb(230, 245, 244)" }}
                  align="left"
                >
                  <button
                    className="sortBTN"
                    onClick={() => {
                      handleSortOrder();
                      setIDBTN("none");
                      setFNameBTN("none");
                      setLNameBTN("none");
                      setPosBTN("none");
                      setSalaryBTN("none");
                      setbirthDateBTN("none");
                      setAddressBTN("black");
                      setCurrField("address");
                    }}
                  >
                    Address
                    <span
                      className="arrow"
                      id="address"
                      style={{
                        rotate: sortOrder === "asc" ? "180deg" : "360deg",
                        background: `${addressBTN}`,
                      }}
                    />
                  </button>
                </TableCell>
                <TableCell
                  sx={{ background: "rgb(230, 245, 244)" }}
                  align="left"
                >
                  <button
                    className="sortBTN"
                    onClick={() => {
                      handleSortOrder();
                      setIDBTN("none");
                      setFNameBTN("none");
                      setLNameBTN("none");
                      setPosBTN("none");
                      setSalaryBTN("none");
                      setAddressBTN("none");
                      setbirthDateBTN("black");
                      setCurrField("birthDate");
                    }}
                  >
                    Birth Date
                    <span
                      className="arrow"
                      id="birthDate"
                      style={{
                        rotate: sortOrder === "asc" ? "180deg" : "360deg",
                        background: `${birthDateBTN}`,
                      }}
                    />
                  </button>
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "18px",
                    borderLeft: "solid rgba(224, 224, 224, 1) 1px",
                    background: "rgb(230, 245, 244)",
                  }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{list}</TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={9}>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ width: "100px" }}>
                      <InputLabel id="select-label">Quantity</InputLabel>
                      <Select
                        labelId="select-label"
                        id="selec"
                        value={quantity}
                        label="Records per page"
                        onChange={handleChange}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                      </Select>
                    </FormControl>
                    <button
                      className="pageArrow"
                      sx={{ fontSize: "20px", padding: "0", margin: "0" }}
                      onClick={(e) => {
                        setPage(page - 1);
                      }}
                      disabled={page > 1 ? false : true}
                    >
                      &lt;
                    </button>
                    <Typography variant="h6" color="black">
                      Page: {page}
                    </Typography>
                    <button
                      className="pageArrow"
                      sx={{ fontSize: "20px", padding: "0", margin: "0" }}
                      onClick={() => {
                        setPage(page + 1);
                      }}
                      disabled={employees.totalPages === page ? true : false}
                    >
                      &gt;
                    </button>
                    <Typography>Total pages: {employees.totalPages}</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Home;
