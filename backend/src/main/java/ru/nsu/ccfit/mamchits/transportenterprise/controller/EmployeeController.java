package ru.nsu.ccfit.mamchits.transportenterprise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.employee.EmployeeDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.EmployeeService;

import java.util.Optional;

@RestController
@RequestMapping(path="/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<EmployeeDto> findAll() {
        return employeeService.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Optional<EmployeeDto> findById(@PathVariable Long id) {
        return employeeService.findById(id);
    }

    @GetMapping(path="/{id}/subordinates")
    public @ResponseBody Iterable<EmployeeDto> findSubordinatesById(@PathVariable Long id) {
        return employeeService.findSubordinatesById(id);
    }

    @GetMapping(path="/{id}/superiors")
    public @ResponseBody Iterable<EmployeeDto> findSuperiorsById(@PathVariable Long id) {
        return employeeService.findSuperiorsById(id);
    }
}
