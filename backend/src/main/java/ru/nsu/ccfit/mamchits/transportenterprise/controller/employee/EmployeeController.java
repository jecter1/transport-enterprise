package ru.nsu.ccfit.mamchits.transportenterprise.controller.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.employee.EmployeeDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.employee.EmployeeService;

import java.util.Optional;

@RestController
@RequestMapping(path="/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<EmployeeDto> getAll() {
        return employeeService.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Optional<EmployeeDto> getById(@PathVariable String id) {
        return employeeService.findById(Long.parseLong(id));
    }

    @GetMapping(path="/{id}/subordinates")
    public @ResponseBody Iterable<EmployeeDto> getSubordinatesById(@PathVariable String id) {
        return employeeService.findSubordinatesById(Long.parseLong(id));
    }

    @GetMapping(path="/{id}/superiors")
    public @ResponseBody Iterable<EmployeeDto> getSuperiorsById(@PathVariable String id) {
        return employeeService.findSuperiorsById(Long.parseLong(id));
    }
}
