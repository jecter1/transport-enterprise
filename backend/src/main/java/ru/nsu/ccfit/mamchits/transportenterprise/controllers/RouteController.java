package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Route;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.RouteRepository;

@Controller
@RequestMapping(path="/route")
public class RouteController {
    @Autowired
    private RouteRepository routeRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Route> findAll() {
        return routeRepository.findAll();
    }
}
