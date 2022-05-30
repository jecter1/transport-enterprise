package ru.nsu.ccfit.mamchits.transportenterprise.service.repair;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.repair.RepairRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RepairService {
    private final RepairRepository repairRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<RepairDto> findAllByTransportId(Long transportId) {
        return repairRepository.findAll()
                .stream()
                .filter(repair -> Objects.equals(repair.getTransport().getId(), transportId))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private RepairDto convertToDto(Repair repair) {
        RepairDto repairDto = modelMapper.map(repair, RepairDto.class);
        repairDto.setStartDatetime(repair.getStartDatetime());
        repairDto.setEndDatetime(repair.getEndDatetime());
        Transport transport = repair.getTransport();
        repairDto.setTransportId(transport.getId());
        repairDto.setTransportType(transport.getType());
        repairDto.setTransportNumber(transport.getNumber());
        repairDto.setTransportModel(transport.getModel());
        repairDto.setTransportColor(transport.getColor());
        repairDto.setTransportBrand(transport.getBrand());
        Garage garage = repair.getGarage();
        if (garage != null) {
            repairDto.setGarageId(garage.getId());
            repairDto.setGarageLocation(garage.getLocation());
        }
        return repairDto;
    }
}
