package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairPageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairSidePanelDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.garage.GarageRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.repair.RepairRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.transport.TransportRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RepairService {
    private final RepairRepository repairRepository;
    private final GarageRepository garageRepository;
    private final TransportRepository transportRepository;

    @Autowired
    private ModelMapper modelMapper;

    public boolean deleteById(Long id) {
        Repair repair = repairRepository.findById(id).orElse(null);
        if (repair == null) {
            return false;
        }
        repairRepository.deleteById(id);
        return repairRepository.findById(id).isEmpty();
    }

    public List<RepairSidePanelDto> findByTransportId(Long transportId) {
        return transportRepository
                .findById(transportId)
                .map(Transport::getRepairSet)
                .map(Collection::stream)
                .map(repairStream ->
                        repairStream
                                .map(this::convertToSidePanelDto)
                                .collect(Collectors.toList())).orElse(new ArrayList<>());
    }

    public List<RepairSidePanelDto> findByGarageId(Long garageId) {
        return garageRepository
                .findById(garageId)
                .map(Garage::getRepairSet)
                .map(Collection::stream)
                .map(repairStream ->
                        repairStream
                                .map(this::convertToSidePanelDto)
                                .collect(Collectors.toList())).orElse(new ArrayList<>());
    }

    public Optional<RepairPageDto> findById(Long id) {
        return repairRepository.findById(id).map(this::convertToPageDto);
    }

    public List<RepairListInfoDto> findAll() {
        return repairRepository.findAll().stream().map(this::convertToListInfoDto).collect(Collectors.toList());
    }

//    public List<RepairListInfoDto> findAllByTransportId(Long transportId) {
//        return repairRepository.findAll()
//                .stream()
//                .filter(repair -> Objects.equals(repair.getTransport().getId(), transportId))
//                .map(this::convertToRepairListInfoDto)
//                .collect(Collectors.toList());
//    }

    private RepairListInfoDto convertToListInfoDto(Repair repair) {
        RepairListInfoDto repairDto = modelMapper.map(repair, RepairListInfoDto.class);
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

    private RepairPageDto convertToPageDto(Repair repair) {
        RepairPageDto repairPageDto = modelMapper.map(repair, RepairPageDto.class);
        repairPageDto.setStartDatetime(repair.getStartDatetime());
        repairPageDto.setEndDatetime(repair.getEndDatetime());
        return repairPageDto;
    }

    private RepairSidePanelDto convertToSidePanelDto(Repair repair) {
        RepairSidePanelDto repairSidePanelDto = modelMapper.map(repair, RepairSidePanelDto.class);
        Transport transport = repair.getTransport();
        repairSidePanelDto.setTransportBrand(transport.getBrand());
        repairSidePanelDto.setTransportModel(transport.getModel());
        repairSidePanelDto.setTransportNumber(transport.getNumber());
        return repairSidePanelDto;
    }
}
