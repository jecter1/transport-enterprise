package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.garage.GarageListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.garage.GaragePageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.garage.GarageTransportDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.garage.GarageRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.repair.RepairRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.transport.TransportRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GarageService {
    private final GarageRepository garageRepository;
    private final RepairRepository repairRepository;
    private final TransportRepository transportRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<GarageTransportDto> findAllGaragesTransport() {
        return garageRepository.findAll().stream().map(this::convertToGarageTransportDto).flatMap(List::stream).collect(Collectors.toList());
    }

    public boolean deleteById(Long id) {
        Garage garage = garageRepository.findById(id).orElse(null);
        if (garage == null) {
            return false;
        }
        garageRepository.deleteById(id);
        return garageRepository.findById(id).isEmpty();
    }

    public Optional<GaragePageDto> findByTransportId(Long transportId) {
        return transportRepository.findById(transportId).map(Transport::getGarage).map(this::convertToPageDto);
    }

    public Optional<GaragePageDto> findByRepairId(Long repairId) {
        return repairRepository.findById(repairId)
                .map(Repair::getGarage)
                .map(this::convertToPageDto);
    }

    public Optional<GaragePageDto> findById(Long id) {
        return garageRepository.findById(id).map(this::convertToPageDto);
    }

    public List<GarageListInfoDto> findAll(TransportType transportType) {
        if (transportType == null) {
            return garageRepository.findAll().stream().map(this::convertToListInfoDto).collect(Collectors.toList());
        }
        Set<Garage> garageSet = new HashSet<>();
        for (var childType : transportType.getChildTypes()) {
            garageSet.addAll(
                    transportRepository
                    .findAllByType(childType)
                    .stream().map(Transport::getGarage)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet())
            );
        }
        return garageSet.stream().map(this::convertToListInfoDto).collect(Collectors.toList());
    }

    private List<GarageTransportDto> convertToGarageTransportDto(Garage garage) {
        List<GarageTransportDto> garageTransportDtoList = new ArrayList<>();
        Set<Transport> transportSet = garage.getTransportSet();
        if (transportSet.size() == 0) {
            GarageTransportDto garageTransportDto = modelMapper.map(garage, GarageTransportDto.class);
            garageTransportDtoList.add(garageTransportDto);
            return garageTransportDtoList;
        }
        for (var transport : transportSet) {
            GarageTransportDto garageTransportDto = modelMapper.map(garage, GarageTransportDto.class);
            garageTransportDto.setTransportId(transport.getId());
            garageTransportDto.setTransportColor(transport.getColor());
            garageTransportDto.setTransportBrand(transport.getBrand());
            garageTransportDto.setTransportType(transport.getType());
            garageTransportDto.setTransportModel(transport.getModel());
            garageTransportDto.setTransportNumber(transport.getNumber());
            garageTransportDtoList.add(garageTransportDto);
        }
        return garageTransportDtoList;
    }

    private GarageListInfoDto convertToListInfoDto(Garage garage) {
        return modelMapper.map(garage, GarageListInfoDto.class);
    }

    private GaragePageDto convertToPageDto(Garage garage) {
        return modelMapper.map(garage, GaragePageDto.class);
    }
}
