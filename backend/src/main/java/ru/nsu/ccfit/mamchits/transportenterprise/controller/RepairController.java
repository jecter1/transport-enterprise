package ru.nsu.ccfit.mamchits.transportenterprise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairCountCostDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairPageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairSidePanelDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.RepairService;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import java.util.Optional;

@RestController
@RequestMapping(path = "/repair")
public class RepairController {
    @Autowired
    private RepairService repairService;

    @GetMapping(path = "/assembly")
    public @ResponseBody Iterable<String> getAllAssembly() {
        return repairService.findAllAssembly();
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody boolean deleteById(@PathVariable String id) {
        return repairService.deleteById(Long.parseLong(id));
    }

    @GetMapping(params = "transportId")
    public @ResponseBody Iterable<RepairSidePanelDto> getAllByTransportId(@RequestParam String transportId) {
        return repairService.findAllByTransportId(Long.parseLong(transportId));
    }

    @GetMapping(params = "garageId")
    public @ResponseBody Iterable<RepairSidePanelDto> getByGarageId(@RequestParam String garageId) {
        return repairService.findAllByGarageId(Long.parseLong(garageId));
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Optional<RepairPageDto> getById(@PathVariable String id) {
        return repairService.findById(Long.parseLong(id));
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<RepairListInfoDto>  getAll(
            @RequestParam(required = false) Long transportId,
            @RequestParam(required = false) Long staffId,
            @RequestParam(required = false) String dateFrom,
            @RequestParam(required = false) String dateTo) {
        return repairService.findAll(transportId, staffId, dateFrom,dateTo);
    }

    @GetMapping(path = "/repairs-count-cost")
    public @ResponseBody Iterable<RepairCountCostDto> getAllCountCost(
            @RequestParam(required = false) Long transportId,
            @RequestParam(required = false) String transportType,
            @RequestParam(required = false) String transportBrand,
            @RequestParam(required = false) String assembly,
            @RequestParam(required = false) String dateFrom,
            @RequestParam(required = false) String dateTo) {
        TransportType type = TransportType.decode(transportType);
        return repairService.findAllCountCost(transportId, type, transportBrand, assembly, dateFrom, dateTo);
    }
}
