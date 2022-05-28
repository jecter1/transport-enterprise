package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.*;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.TransportRepository;

import java.util.Optional;

@Controller
@RequestMapping(path="/transport")
public class TransportController {
    @Autowired
    TransportRepository transportRepository;

    @GetMapping(path="/numbers/all")
    public @ResponseBody Iterable<TransportNumberDto> findTransportNumbers() {
        return transportRepository.findTransportNumbers();
    }

    @GetMapping(path="/short-all")
    public @ResponseBody Iterable<Transport> findAllTransport() {
        return transportRepository.findAll();
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<TransportInfoDto> findAllTransportInfo() {
        return transportRepository.findAllInfo();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody
    Optional<TransportInfoDto> findTransportInfoById(@PathVariable String id) {
        return transportRepository.findTransportInfoById(Integer.parseInt(id));
    }

    @GetMapping(path="/drivers")
    public @ResponseBody Iterable<TransportDriverDto> findAllDrivers() {
        return transportRepository.findAllDrivers();
    }

    @GetMapping(path="/{id}/drivers")
    public @ResponseBody Iterable<EmployeeNameDto> findTransportDrivers(@PathVariable String id) {
        return transportRepository.findTransportDrivers(Integer.parseInt(id));
    }

    @GetMapping(path="/routes")
    public @ResponseBody Iterable<TransportRouteDto> findTransportWithRoutes() {
        return transportRepository.findTransportWithRoutes();
    }

    @DeleteMapping(path="/{id}")
    public @ResponseBody void deleteById(@PathVariable String id) {
        transportRepository.deleteById(Integer.parseInt(id));
    }
}
