package ru.nsu.ccfit.mamchits.transportenterprise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairPageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairSidePanelDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.RepairService;

import java.util.Optional;

@RestController
@RequestMapping(path = "/repair")
public class RepairController {
    @Autowired
    private RepairService repairService;

    @DeleteMapping(path = "/{id}")
    public @ResponseBody boolean deleteById(@PathVariable String id) {
        return repairService.deleteById(Long.parseLong(id));
    }

    @GetMapping(params = "transportId")
    public @ResponseBody Iterable<RepairSidePanelDto> getByTransportId(@RequestParam String transportId) {
        return repairService.findByTransportId(Long.parseLong(transportId));
    }

    @GetMapping(params = "garageId")
    public @ResponseBody Iterable<RepairSidePanelDto> getByGarageId(@RequestParam String garageId) {
        return repairService.findByGarageId(Long.parseLong(garageId));
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<RepairPageDto> getById(@PathVariable String id) {
        return repairService.findById(Long.parseLong(id));
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<RepairListInfoDto>  getAll() {
        return repairService.findAll();
    }

//    @GetMapping
//    public @ResponseBody Iterable<RepairListInfoDto> getAllByTransportId(@RequestParam String transportId) {
//        return repairService.findAllByTransportId(Long.parseLong(transportId));
//    }
}