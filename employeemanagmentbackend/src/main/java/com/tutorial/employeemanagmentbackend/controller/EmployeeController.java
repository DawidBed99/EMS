package com.tutorial.employeemanagmentbackend.controller;

import com.tutorial.employeemanagmentbackend.model.Employee;
import com.tutorial.employeemanagmentbackend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService; //we are bringing in Employee Service instance

    /**This is a post Request, here we are gonna ba saving an employee*/
    @PostMapping
    public Employee saveEmployee(@RequestBody Employee employee){
        return employeeService.saveEmployee(employee);
    }
        /** Here, we are getting all employee*/
    @GetMapping
    public List<Employee> getAllEmployee(){
        return employeeService.getAllEmployee();
    }
     /**here, we are geting one empployee*/
    @GetMapping("/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable int id){
        return employeeService.getEmployeeById(id);
    }
        /**here, we get gonna be updating an employee*/
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable int id, @RequestBody Employee employee){
        return employeeService.updateEmployee(id,employee);
    }
      /**Here, we are gonna be deleting an employee*/
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable int id){
        employeeService.deleteEmployee(id);
    }

    @GetMapping("/sort/{field}/{order}")
    public List<Employee> sortEmployee(@PathVariable String field, @PathVariable String order){
        return employeeService.sortEmployee(field, order);
    }
    @GetMapping("/pagination/{offset}/{pageSize}")
    public Page<Employee> paginationEmployee(@PathVariable int offset, @PathVariable int pageSize){
        return employeeService.paginationEmployee(offset, pageSize);
    }
    @CrossOrigin
    @GetMapping("/pagination/pageNumber={offset}/quantity={pageSize}/sortBy={field}/sortDir={order}")
    public Page<Employee> paginationAndSortingEmployee(@PathVariable int offset, @PathVariable int pageSize,@PathVariable String field, @PathVariable String order){
        return employeeService.paginationAndSortingEmployee(offset, pageSize, field, order);
    }
}
