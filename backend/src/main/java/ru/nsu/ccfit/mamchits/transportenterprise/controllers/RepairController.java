package ru.nsu.ccfit.mamchits.transportenterprise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Repair.RepairFullInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.RepairRepository;

@Controller
@RequestMapping(path="/repair")
public class RepairController {
    @Autowired
    private RepairRepository repairRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<RepairFullInfoDto> findAll() {
        return repairRepository.findAllFullInfo();
    }
}
