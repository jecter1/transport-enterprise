package ru.nsu.ccfit.mamchits.transportenterprise.controller.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.employee.DriverDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.employee.DriverService;

import java.util.Optional;

@RestController
@RequestMapping(path="/driver")
public class DriverController {
    @Autowired
    private DriverService driverService;

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<DriverDto> getById(@PathVariable String id) {
        return driverService.findById(Long.parseLong(id));
    }

    @GetMapping
    public @ResponseBody Iterable<DriverDto> getAllByTransportId(@RequestParam String transportId) {
        return driverService.findAllByTransportId(Long.parseLong(transportId));
    }
}
