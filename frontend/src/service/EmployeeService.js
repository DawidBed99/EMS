import axios from "axios";

const BASE_URL = "http://localhost:8080/employee";
class EmployeeService {
  getEmployeeById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  updateEmployee(id, employeeData) {
    return axios.put(`${BASE_URL}/${id}`, employeeData);
  }
}
export default new EmployeeService();
