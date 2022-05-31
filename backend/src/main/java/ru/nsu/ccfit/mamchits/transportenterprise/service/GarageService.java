package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.garage.GarageListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.garage.GaragePageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.garage.GarageRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.repair.RepairRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.transport.TransportRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GarageService {
    private final GarageRepository garageRepository;
    private final RepairRepository repairRepository;
    private final TransportRepository transportRepository;

    @Autowired
    private ModelMapper modelMapper;

    public boolean deleteById(Long id) {
        Garage garage = garageRepository.findById(id).orElse(null);
        if (garage == null) {
            return false;
        }
        garageRepository.deleteById(id);
        return true;
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

    public List<GarageListInfoDto> findAll() {
        return garageRepository.findAll().stream().map(this::convertToListInfoDto).collect(Collectors.toList());
    }

    private GarageListInfoDto convertToListInfoDto(Garage garage) {
        return modelMapper.map(garage, GarageListInfoDto.class);
    }

    private GaragePageDto convertToPageDto(Garage garage) {
        return modelMapper.map(garage, GaragePageDto.class);
    }
}
