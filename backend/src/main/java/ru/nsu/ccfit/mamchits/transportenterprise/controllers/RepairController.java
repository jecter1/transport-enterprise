package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Repair.RepairFullInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Repair.RepairProfileDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Repair.RepairStaffDto;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.RepairRepository;

import java.util.Optional;

@Controller
@RequestMapping(path="/repair")
public class RepairController {
    @Autowired
    private RepairRepository repairRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<RepairFullInfoDto> findAllFullInfo() {
        return repairRepository.findAllFullInfo();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Optional<RepairProfileDto> findProfileInfoById(@PathVariable String id) {
        return repairRepository.findProfileInfoById(Integer.parseInt(id));
    }

    @GetMapping(path="/{id}/staff")
    public @ResponseBody Iterable<RepairStaffDto> findStaffById(@PathVariable String id) {
        return repairRepository.findStaffById(Integer.parseInt(id));
    }
}
