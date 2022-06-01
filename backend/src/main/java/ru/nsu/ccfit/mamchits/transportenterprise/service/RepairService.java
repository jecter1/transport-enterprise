package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairCountCostDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairPageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.repair.RepairSidePanelDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.ServiceStaff;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.garage.GarageRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.repair.RepairRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.transport.TransportRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RepairService {
    private final RepairRepository repairRepository;
    private final GarageRepository garageRepository;
    private final TransportRepository transportRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<String> findAllAssembly() {
        return repairRepository.findAll().stream().map(Repair::getAssembly).collect(Collectors.toSet()).stream().toList();
    }

    public boolean deleteById(Long id) {
        Repair repair = repairRepository.findById(id).orElse(null);
        if (repair == null) {
            return false;
        }
        repairRepository.deleteById(id);
        return repairRepository.findById(id).isEmpty();
    }

    public List<RepairCountCostDto> findAllCountCost(Long transportId,
                                                     TransportType transportType,
                                                     String transportBrand,
                                                     String assembly,
                                                     String dateFrom,
                                                     String dateTo) {
        return transportRepository
                .findAll()
                .stream()
                .filter(transport ->
                        (transportId == null || transport.getId().equals(transportId)) &&
                        (transportType == null || transport.getType().getParentTypes().contains(transportType)) &&
                        (transportBrand == null || transport.getBrand().equals(transportBrand)))
                .map(transport -> convertToCountCostDto(transport, dateFrom, dateTo, assembly))
                .sorted((dto1, dto2) -> dto2.getCount().compareTo(dto1.getCount()))
                .collect(Collectors.toList());
    }

    public List<RepairSidePanelDto> findAllByTransportId(Long transportId) {
        return transportRepository
                .findById(transportId)
                .map(Transport::getRepairSet)
                .map(Collection::stream)
                .map(repairStream ->
                        repairStream
                                .map(this::convertToSidePanelDto)
                                .collect(Collectors.toList())).orElse(new ArrayList<>());
    }

    public List<RepairSidePanelDto> findAllByGarageId(Long garageId) {
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

    public List<RepairListInfoDto> findAll(Long transportId, Long staffId, String dateFrom, String dateTo) {
        if (dateFrom != null && dateTo != null && dateFrom.compareTo(dateTo) > 0) {
            return new ArrayList<>();
        }
        return repairRepository
                .findAll()
                .stream()
                .filter(repair ->
                        (transportId == null || Objects.equals(repair.getTransport().getId(), transportId)) &&
                        (staffId == null || (repair.getServiceStaffSet().stream().map(ServiceStaff::getId).toList().contains(staffId))) &&
                        (dateBetween(repair.getStartDatetime(), repair.getEndDatetime(), dateFrom, dateTo))
                )
                .map(this::convertToListInfoDto)
                .collect(Collectors.toList());
    }

    private boolean dateBetween(Calendar calendarFrom, Calendar calendarTo, String from, String to) {
        if (calendarFrom == null && calendarTo == null && from == null && to == null) {
            return true;
        } else if (calendarFrom == null || calendarTo == null) {
            return false;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String dateFrom = simpleDateFormat.format(calendarFrom.getTime());
        String dateTo = simpleDateFormat.format(calendarTo.getTime());
        return (to == null || dateFrom.compareTo(to) <= 0) &&
                (from == null || dateTo.compareTo(from) >= 0);
    }

    private RepairCountCostDto convertToCountCostDto(Transport transport, String from, String to, String assembly) {
        RepairCountCostDto repairCountCostDto = modelMapper.map(transport, RepairCountCostDto.class);
        repairCountCostDto.setCost(0f);
        repairCountCostDto.setCount(0);
        for (var repair : transport.getRepairSet()) {
            if (dateBetween(repair.getStartDatetime(), repair.getEndDatetime(), from, to) &&
                    (assembly == null || Objects.equals(repair.getAssembly(), assembly))) {
                repairCountCostDto.setCount(repairCountCostDto.getCount() + 1);
                repairCountCostDto.setCost(repairCountCostDto.getCost() + repair.getCost());
            }
        }
        return repairCountCostDto;
    }

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
