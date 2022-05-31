package ru.nsu.ccfit.mamchits.transportenterprise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.garage.GarageListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.garage.GaragePageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.GarageService;

import java.util.Optional;

@RestController
@RequestMapping(path = "/garage")
public class GarageController {
    @Autowired
    private GarageService garageService;

    @DeleteMapping(path = "/{id}")
    public @ResponseBody boolean deleteById(@PathVariable String id) {
        return garageService.deleteById(Long.parseLong(id));
    }

    @GetMapping(params = "transportId")
    public @ResponseBody Optional<GaragePageDto> getByTransportId(@RequestParam String transportId) {
        return garageService.findByTransportId(Long.parseLong(transportId));
    }

    @GetMapping(params = "repairId")
    public @ResponseBody Optional<GaragePageDto> getByRepairId(@RequestParam String repairId) {
        return garageService.findByRepairId(Long.parseLong(repairId));
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<GaragePageDto> getById(@PathVariable String id) {
        return garageService.findById(Long.parseLong(id));
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<GarageListInfoDto> getAll() {
        return garageService.findAll();
    }
}
