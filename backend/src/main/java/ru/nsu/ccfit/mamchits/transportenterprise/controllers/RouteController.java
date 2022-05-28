package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Route.TransportShortDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Route;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.RouteRepository;

import java.util.Optional;

@Controller
@RequestMapping(path="/route")
public class RouteController {
    @Autowired
    private RouteRepository routeRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Route> findAll() {
        return routeRepository.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Optional<Route> findById(@PathVariable String id) {
        return routeRepository.findById(Integer.parseInt(id));
    }

    @GetMapping(path="/{id}/transport")
    public @ResponseBody
    Iterable<TransportShortDto> findTransportById(@PathVariable String id) {
        return routeRepository.findTransportById(Integer.parseInt(id));
    }
}
