package com.tutorial.employeemanagmentbackend.service;

import com.tutorial.employeemanagmentbackend.model.Employee;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface EmployeeServiceInterface {
    public Employee saveEmployee(Employee employee);
    public Optional<Employee> getEmployeeById(int id);
    List<Employee> getAllEmployee();
    Employee updateEmployee(int id, Employee employee);
    void deleteEmployee(int id);

    List<Employee> sortEmployee(String field, String order);

    Page<Employee> paginationEmployee(int offset, int pageSize);
    Page<Employee> paginationAndSortingEmployee(int offset, int pageSize, String field, String order);
}
