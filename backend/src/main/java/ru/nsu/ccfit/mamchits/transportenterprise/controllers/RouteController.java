package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Route.TransportShortDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Route;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.RouteRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.TransportRepository;

import java.util.Optional;

@Controller
@RequestMapping(path="/route")
public class RouteController {
    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private TransportRepository transportRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Route> findAll() {
        return routeRepository.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Optional<Route> findById(@PathVariable String id) {
        return routeRepository.findById(Integer.parseInt(id));
    }

    @GetMapping(path="/{id}/transport")
    public @ResponseBody Iterable<TransportShortDto> findTransportById(@PathVariable String id) {
        return routeRepository.findTransportById(Integer.parseInt(id));
    }

    @Transactional
    @DeleteMapping(path="/{id}")
    public @ResponseBody void deleteRoute(@PathVariable String id) {
        transportRepository.deleteRouteTransportFareByRouteId(Integer.parseInt(id));
        routeRepository.deleteById(Integer.parseInt(id));
    }
}
