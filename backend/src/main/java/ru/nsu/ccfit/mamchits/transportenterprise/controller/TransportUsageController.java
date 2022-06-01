package ru.nsu.ccfit.mamchits.transportenterprise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.usage.TransportUsageListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.usage.TransportUsagePageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.TransportUsageService;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

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
    public @ResponseBody Iterable<TransportUsageListInfoDto> getAll(
            @RequestParam(required = false) Long transportId,
            @RequestParam(required = false) String transportType,
            @RequestParam(required = false) String dateFrom,
            @RequestParam(required = false) String dateTo) {
        TransportType type = TransportType.decode(transportType);
        return transportUsageService.findAll(transportId, type, dateFrom, dateTo);
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<TransportUsagePageDto> getById(@PathVariable String id) {
        return transportUsageService.findById(Long.parseLong(id));
    }
}
