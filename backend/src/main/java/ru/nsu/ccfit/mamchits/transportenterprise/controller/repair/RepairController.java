package ru.nsu.ccfit.mamchits.transportenterprise.controller.repair;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairDto;
import ru.nsu.ccfit.mamchits.transportenterprise.service.repair.RepairService;

@RestController
@RequestMapping(path="/repair")
public class RepairController {
    @Autowired
    private RepairService repairService;

    @GetMapping
    public @ResponseBody
    Iterable<RepairDto> getAllByTransportId(@RequestParam String transportId) {
        return repairService.findAllByTransportId(Long.parseLong(transportId));
    }
}
