package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.GarageRepository;

@Controller
@RequestMapping(path="/garage")
public class GarageController {
    @Autowired
    private GarageRepository garageRepository;

    @GetMapping(path="/all")
    public @ResponseBody
    Iterable<Garage> findAll() {
        return garageRepository.findAll();
    }
}
