package ru.nsu.ccfit.mamchits.transportenterprise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.employee.*;
import ru.nsu.ccfit.mamchits.transportenterprise.service.EmployeeService;

import java.util.Optional;

@RestController
@RequestMapping(path = "/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping(path = "/employee-hierarchy")
    public @ResponseBody Iterable<EmployeeHierarchyDto> getAllEmployeeHierarchy() {
        return employeeService.findAllEmployeeHierarchy();
    }

    @GetMapping(path = "/drivers-transport", params = "transportId")
    public @ResponseBody Iterable<DriverTransportDto> getAllDriversTransportByTransportId(@RequestParam String transportId) {
        return employeeService.findAllDriversTransportByTransportId(Long.parseLong(transportId));
    }

    @GetMapping(path = "/drivers-transport")
    public @ResponseBody Iterable<DriverTransportDto> getAllDriversTransport() {
        return employeeService.findAllDriversTransport();
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody boolean deleteById(@PathVariable String id) {
        return employeeService.deleteById(Long.parseLong(id));
    }

    @GetMapping(params = "transportId")
    public @ResponseBody Iterable<EmployeeSidePanelDto> getByTransportId(@RequestParam String transportId) {
        return employeeService.findByTransportId(Long.parseLong(transportId));
    }

    @GetMapping(path = "/{id}/superiors")
    public @ResponseBody Iterable<EmployeeSidePanelDto> getSuperiorsById(@PathVariable String id) {
        return employeeService.findSuperiorsById(Long.parseLong(id));
    }

    @GetMapping(path = "/{id}/subordinates")
    public @ResponseBody Iterable<EmployeeSidePanelDto> getSubordinatesById(@PathVariable String id) {
        return employeeService.findSubordinatesById(Long.parseLong(id));
    }

    @GetMapping(params = "repairId")
    public @ResponseBody Iterable<EmployeeSidePanelDto> getByRepairId(@RequestParam String repairId) {
        return employeeService.findByRepairId(Long.parseLong(repairId));
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<EmployeePageDto> getById(@PathVariable String id) {
        return employeeService.findById(Long.parseLong(id));
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<EmployeeListInfoDto> getAll() {
        return employeeService.findAll();
    }
}
