package ru.nsu.ccfit.mamchits.transportenterprise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.route.RouteCreateDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.route.RouteListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.route.RoutePageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.RouteService;

import java.util.Optional;

@RestController
@RequestMapping(path = "/route")
public class RouteController {
    @Autowired
    private RouteService routeService;

    @PostMapping
    public @ResponseBody Long post(@RequestBody RouteCreateDto routeCreateDto) {
        return routeService.create(routeCreateDto);
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody boolean deleteById(@PathVariable String id) {
        return routeService.deleteById(Long.parseLong(id));
    }

    @GetMapping(params = "transportId")
    public @ResponseBody Optional<RoutePageDto> getByTransportId(@RequestParam String transportId) {
        return routeService.findByTransportId(Long.parseLong(transportId));
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<RoutePageDto> getById(@PathVariable String id) {
        return routeService.findById(Long.parseLong(id));
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<RouteListInfoDto> getAll() {
        return routeService.findAll();
    }
}
