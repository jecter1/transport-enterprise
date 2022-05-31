package ru.nsu.ccfit.mamchits.transportenterprise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.transport.*;
import ru.nsu.ccfit.mamchits.transportenterprise.service.TransportService;

import java.util.Optional;

@RestController
@RequestMapping(path = "/transport")
public class TransportController {
    @Autowired
    private TransportService transportService;

    @GetMapping(path = "/route-transport-routes")
    public Iterable<RouteTransportRouteDto> getAllRouteTransportRoutes() {
        return transportService.findAllRouteTransportRoutes();
    }

    @GetMapping(path = "/transport-drivers")
    public Iterable<TransportDriverDto> getAllTransportDrivers() {
        return transportService.findAllTransportDrivers();
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteById(@PathVariable String id) {
        return transportService.deleteById(Long.parseLong(id));
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<TransportPageDto> getById(@PathVariable String id) {
        return transportService.findById(Long.parseLong(id));
    }

    @GetMapping(params = "driverId")
    public @ResponseBody Optional<TransportPageDto> getByDriverId(@RequestParam String driverId) {
        return transportService.findByDriverId(Long.parseLong(driverId));
    }

    @GetMapping(params = "repairId")
    public @ResponseBody Optional<TransportPageDto> getByRepairId(@RequestParam String repairId) {
        return transportService.findByRepairId(Long.parseLong(repairId));
    }

    @GetMapping(params = "transportUsageId")
    public @ResponseBody Optional<TransportPageDto> getByTransportUsageId(@RequestParam String transportUsageId) {
        return transportService.findByTransportUsageId(Long.parseLong(transportUsageId));
    }

    @GetMapping(params = "routeId")
    public @ResponseBody Iterable<TransportSidePanelDto> getByRouteId(@RequestParam String routeId) {
        return transportService.findByRouteId(Long.parseLong(routeId));
    }

    @GetMapping(params = "garageId")
    public @ResponseBody Iterable<TransportSidePanelDto> getByGarageId(@RequestParam String garageId) {
        return transportService.findByGarageId(Long.parseLong(garageId));
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<TransportListInfoDto> getAll() {
        return transportService.findAll();
    }
}
