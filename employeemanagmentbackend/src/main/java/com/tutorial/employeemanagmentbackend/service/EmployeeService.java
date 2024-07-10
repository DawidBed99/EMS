package com.tutorial.employeemanagmentbackend.service;

import com.tutorial.employeemanagmentbackend.model.Employee;
import com.tutorial.employeemanagmentbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements EmployeeServiceInterface {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Optional<Employee> getEmployeeById(int id) {
        return employeeRepository.findById(id);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployee(int id, Employee employee) {
        Employee employeeToUpdate = employeeRepository.findById(id).orElseThrow();
        employeeToUpdate.setFirstName(employee.getFirstName());
        employeeToUpdate.setLastName(employee.getLastName());
        employeeToUpdate.setEmail(employee.getEmail());
        employeeToUpdate.setPosition(employee.getPosition());
        employeeToUpdate.setAddress(employee.getAddress());
        employeeToUpdate.setSalary(employee.getSalary());
        employeeToUpdate.setBirthDate((employee.getBirthDate()));
        return employeeRepository.save(employeeToUpdate);
    }

    @Override
    public void deleteEmployee(int id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public List<Employee> sortEmployee(String field, String order) {
        return employeeRepository.findAll(Sort.by(order.equals("asc")?Sort.Direction.ASC :Sort.Direction.DESC , field));
    }
    @Override
    public Page<Employee> paginationEmployee(int offset, int pageSize) {
        return employeeRepository.findAll(PageRequest.of(offset,pageSize));
    }
    @Override
    public Page<Employee> paginationAndSortingEmployee(int offset, int pageSize, String field, String order) {
        return employeeRepository.findAll(PageRequest.of(offset,pageSize).withSort(Sort.by(order.equals("asc")?Sort.Direction.ASC :Sort.Direction.DESC , field)));
    }
}
