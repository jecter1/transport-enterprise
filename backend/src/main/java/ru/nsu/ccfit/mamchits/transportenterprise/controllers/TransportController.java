package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
}
