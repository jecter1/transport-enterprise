package ru.nsu.ccfit.mamchits.transportenterprise.controller.transport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.transport.TransportDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.transport.TransportService;

import java.util.Optional;

@RestController
@RequestMapping(path="/transport")
public class TransportController {
    @Autowired
    private TransportService transportService;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<TransportDto> getAll() {
        return transportService.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Optional<TransportDto> getById(@PathVariable String id) {
        return transportService.findById(Long.parseLong(id));
    }
}
