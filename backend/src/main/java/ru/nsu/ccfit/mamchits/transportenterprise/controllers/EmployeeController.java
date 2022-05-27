package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.*;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Driver;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Employee;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.DriverRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.EmployeeRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.RepairRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.TransportRepository;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(path="/employee")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private TransportRepository transportRepository;
    @Autowired
    private RepairRepository repairRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<EmployeeWithChiefNameDto> findAllWithChiefName() {
        return employeeRepository.findAllWithChiefName();
    }

    @GetMapping(path="/hierarchy")
    public @ResponseBody Iterable<EmployeeHierarchyDto> findHierarchy() {
        return employeeRepository.findHierarchy();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Optional<Employee> findById(@PathVariable String id) {
        return employeeRepository.findById(Integer.parseInt(id));
    }

    @GetMapping(path="/subordinates/{id}")
    public @ResponseBody Iterable<EmployeePositionDto> findSubordinatesById(@PathVariable String id) {
        return employeeRepository.findSubordinatesById(Integer.parseInt(id));
    }

    @GetMapping(path="/superiors/{id}")
    public @ResponseBody Iterable<EmployeePositionDto> findSuperiorsById(@PathVariable String id) {
        return employeeRepository.findSuperiorsById(Integer.parseInt(id));
    }

    @GetMapping(path="/driver/{id}")
    public @ResponseBody Optional<DriverTransportDto> findDriverTransportById(@PathVariable String id) {
        Optional<Driver> driver = driverRepository.findById(Integer.parseInt(id));
        return driver.map(value -> transportRepository.findDriverTransportByTransportId((value.getTransportId()))).orElse(null);
    }

    @GetMapping(path="/repairs")
    public @ResponseBody Iterable<EmployeeRepairDto> findEmployeeRepairs(@RequestParam() String id,
                                                                     @RequestParam(required = false, defaultValue = "19000101") String from,
                                                                     @RequestParam(required = false, defaultValue = "19000101") String to,
                                                                     @RequestParam(required = false, defaultValue = "0") String transportId) {
        return repairRepository.findEmployeeRepairs(id, from, to, transportId);
    }

    @GetMapping(path="/drivers")
    public @ResponseBody Iterable<DriverDto> findAllDrivers(@RequestParam(required = false, defaultValue = "0") String transportId) {
        return driverRepository.findAllDrivers(Integer.parseInt(transportId));
    }

    @RequestMapping(path="/{id}")
    public @ResponseBody void deleteEmployee(@PathVariable Integer id) {
        employeeRepository.deleteById(id);
    }
}
