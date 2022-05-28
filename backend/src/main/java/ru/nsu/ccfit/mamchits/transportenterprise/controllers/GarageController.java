package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Garage.TransportGarageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Garage.TransportShortDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.GarageRepository;

import java.util.Optional;

@Controller
@RequestMapping(path="/garage")
public class GarageController {
    @Autowired
    private GarageRepository garageRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Garage> findAll() {
        return garageRepository.findAll();
    }

    @GetMapping(path="/transport")
    public @ResponseBody Iterable<TransportGarageDto> findAllTransportGarage() {
        return garageRepository.findAllTransportGarage();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Optional<Garage> findById(@PathVariable String id) {
        return garageRepository.findById(Integer.parseInt(id));
    }

    @GetMapping(path="/{id}/transport")
    public @ResponseBody Iterable<TransportShortDto> findTransportById(@PathVariable String id) {
        return garageRepository.findTransportById(Integer.parseInt(id));
    }

    @DeleteMapping(path="/{id}")
    public @ResponseBody void deleteById(@PathVariable String id) {
        garageRepository.deleteById(Integer.parseInt(id));
    }
}
