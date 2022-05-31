package ru.nsu.ccfit.mamchits.transportenterprise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.usage.TransportUsageListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.usage.TransportUsagePageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.TransportUsageService;

import java.util.Optional;

@RestController
@RequestMapping(path = "/usage")
public class TransportUsageController {
    @Autowired
    private TransportUsageService transportUsageService;

    @DeleteMapping(path = "/{id}")
    public @ResponseBody boolean deleteById(@PathVariable String id) {
        return transportUsageService.deleteById(Long.parseLong(id));
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<TransportUsageListInfoDto> getAll() {
        return transportUsageService.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<TransportUsagePageDto> getById(@PathVariable String id) {
        return transportUsageService.findById(Long.parseLong(id));
    }
}
