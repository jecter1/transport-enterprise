package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.transport.*;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Driver;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.route.Route;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.*;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.AuxiliaryTransportUsage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.FreightTransportUsage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.PassengerTransportUsage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.TransportUsage;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.employee.DriverRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.repair.RepairRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.transport.RouteTransportRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.transport.TransportRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.usage.TransportUsageRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransportService {
    private final TransportRepository transportRepository;
    private final RouteTransportRepository routeTransportRepository;
    private final TransportUsageRepository transportUsageRepository;
    private final RepairRepository repairRepository;
    private final DriverRepository driverRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<TransportType> findAllTypes() {
        return Arrays.stream(TransportType.values()).collect(Collectors.toList());
    }

    public List<RouteTransportRouteDto> findAllRouteTransportRoutes() {
        return routeTransportRepository.findAll().stream().map(this::convertToRouteTransportRouteDto).collect(Collectors.toList());
    }

    public List<TransportDriverDto> findAllTransportDrivers() {
        return transportRepository.findAll().stream().map(this::convertToTransportDriverDtoList).flatMap(List::stream).collect(Collectors.toList());
    }

    public boolean deleteById(Long id) {
        Transport transport = transportRepository.findById(id).orElse(null);
        if (transport == null) {
            return false;
        }
        transportRepository.deleteById(id);
        return transportRepository.findById(id).isEmpty();
    }

    public Optional<TransportPageDto> findById(Long id) {
        return transportRepository.findById(id).map(this::convertToPageDto);
    }

    public Optional<TransportPageDto> findByDriverId(Long driverId) {
        return driverRepository.findById(driverId).map(Driver::getTransport).map(this::convertToPageDto);
    }

    public Optional<TransportPageDto> findByRepairId(Long repairId) {
        return repairRepository.findById(repairId).map(Repair::getTransport).map(this::convertToPageDto);
    }

    public Optional<TransportPageDto> findByTransportUsageId(Long transportUsageId) {
        Optional<TransportUsage> optionalTransportUsage = transportUsageRepository.findById(transportUsageId);
        if (optionalTransportUsage.isEmpty()) {
            return Optional.empty();
        }
        TransportUsage transportUsage = optionalTransportUsage.get();
        AuxiliaryTransportUsage auxiliaryTransportUsage = transportUsage.getAuxiliaryTransportUsage();
        FreightTransportUsage freightTransportUsage = transportUsage.getFreightTransportUsage();
        PassengerTransportUsage passengerTransportUsage = transportUsage.getPassengerTransportUsage();
        Transport transport;
        if (auxiliaryTransportUsage != null) {
            transport = auxiliaryTransportUsage.getAuxiliaryTransport().getTransport();
        } else if (freightTransportUsage != null) {
            transport = freightTransportUsage.getFreightTransport().getTransport();
        } else {
            transport = passengerTransportUsage.getPassengerTransport().getTransport();
        }
        return Optional.of(convertToPageDto(transport));
    }

    public List<TransportSidePanelDto> findByRouteId(Long routeId) {
        return routeTransportRepository.findAll()
                .stream()
                .filter(e -> routeTransportHasRouteId(e, routeId))
                .map(RouteTransport::getPassengerTransport)
                .map(PassengerTransport::getTransport)
                .map(this::convertToSidePanelDto)
                .collect(Collectors.toList());
    }

    public List<TransportSidePanelDto> findByGarageId(Long garageId) {
        return transportRepository.findAll()
                .stream()
                .filter(e -> transportHasGarageId(e, garageId))
                .map(this::convertToSidePanelDto)
                .collect(Collectors.toList());
    }

    public List<TransportListInfoDto> findAll(String receiveFrom,
                                              String receiveTo,
                                              String decommissioningFrom,
                                              String decommissioningTo) {
        return transportRepository
                .findAll()
                .stream()
                .filter(transport ->
                        dateBetween(transport.getReceiveDate(), receiveFrom, receiveTo) &&
                        dateBetween(transport.getDecommissioningDate(), decommissioningFrom, decommissioningTo)
                )
                .map(this::convertToListInfoDto).collect(Collectors.toList());
    }


    private boolean routeTransportHasRouteId(RouteTransport routeTransport, Long routeId) {
        Route route = routeTransport.getRoute();
        if (route == null) {
            return false;
        }
        return Objects.equals(route.getId(), routeId);
    }

    private boolean transportHasGarageId(Transport transport, Long garageId) {
        Garage garage = transport.getGarage();
        if (garage == null) {
            return false;
        }
        return Objects.equals(garage.getId(), garageId);
    }

    private boolean dateBetween(Calendar calendar, String from, String to) {
        if (calendar == null && from == null && to == null) {
            return true;
        } else if (calendar == null) {
            return false;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String date = simpleDateFormat.format(calendar.getTime());
        return (from == null || date.compareTo(from) >= 0) && (to == null || date.compareTo(to) <= 0);
    }

    private RouteTransportRouteDto convertToRouteTransportRouteDto(RouteTransport routeTransport) {
        Transport transport = routeTransport.getPassengerTransport().getTransport();
        RouteTransportRouteDto routeTransportRouteDto = modelMapper.map(transport, RouteTransportRouteDto.class);
        routeTransportRouteDto.setPassengerCapacity(routeTransport.getPassengerTransport().getPassengerCapacity());
        routeTransportRouteDto.setFare(routeTransport.getFare());
        Route route = routeTransport.getRoute();
        if (route == null) {
            return routeTransportRouteDto;
        }
        routeTransportRouteDto.setRouteId(route.getId());
        routeTransportRouteDto.setRouteNumber(route.getNumber());
        routeTransportRouteDto.setRouteStartPoint(route.getStartPoint());
        routeTransportRouteDto.setRouteFinishPoint(route.getFinishPoint());
        return routeTransportRouteDto;
    }

    private List<TransportDriverDto> convertToTransportDriverDtoList(Transport transport) {
        List<TransportDriverDto> transportDriverDtoList = new ArrayList<>();
        Set<Driver> driverSet = transport.getDriverSet();
        if (driverSet.size() == 0) {
            TransportDriverDto transportDriverDto = modelMapper.map(transport, TransportDriverDto.class);
            transportDriverDtoList.add(transportDriverDto);
            return transportDriverDtoList;
        }
        for (var driver : driverSet) {
            TransportDriverDto transportDriverDto = modelMapper.map(transport, TransportDriverDto.class);
            transportDriverDto.setDriverId(driver.getId());
            transportDriverDto.setDriverName(driver.getEmployee().getName());
            transportDriverDto.setDriverPosition(driver.getEmployee().getPosition());
            transportDriverDto.setDriverBirthDate(driver.getEmployee().getBirthDate());
            transportDriverDtoList.add(transportDriverDto);
        }
        return transportDriverDtoList;
    }

    private TransportListInfoDto convertToListInfoDto(Transport transport) {
        TransportListInfoDto transportListInfoDto = modelMapper.map(transport, TransportListInfoDto.class);
        transportListInfoDto.setReceiveDate(transport.getReceiveDate());
        transportListInfoDto.setDecommissioningDate(transport.getDecommissioningDate());
        Garage garage = transport.getGarage();
        if (garage != null) {
            transportListInfoDto.setGarageId(garage.getId());
            transportListInfoDto.setGarageLocation(garage.getLocation());
        }
        return transportListInfoDto;
    }

    private TransportPageDto convertToPageDto(Transport transport) {
        TransportPageDto transportPageDto = modelMapper.map(transport, TransportPageDto.class);
        transportPageDto.setReceiveDate(transport.getReceiveDate());
        transportPageDto.setDecommissioningDate(transport.getDecommissioningDate());
        PassengerTransport passengerTransport = transport.getPassengerTransport();
        FreightTransport freightTransport = transport.getFreightTransport();
        AuxiliaryTransport auxiliaryTransport = transport.getAuxiliaryTransport();
        if (passengerTransport != null) {
            transportPageDto.setPassengerCapacity(passengerTransport.getPassengerCapacity());
            transportPageDto.setUsageCount(passengerTransport.getPassengerTransportUsageSet().size());
            RouteTransport routeTransport = passengerTransport.getRouteTransport();
            if (routeTransport != null) {
                transportPageDto.setFare(routeTransport.getFare());
            }
        } else if (freightTransport != null) {
            transportPageDto.setLoadCapacity(freightTransport.getLoadCapacity());
            transportPageDto.setUsageCount(freightTransport.getFreightTransportUsageSet().size());
        } else if (auxiliaryTransport != null) {
            transportPageDto.setUsageCount(auxiliaryTransport.getAuxiliaryTransportUsageSet().size());
        }
        return transportPageDto;
    }

    private TransportSidePanelDto convertToSidePanelDto(Transport transport) {
        return modelMapper.map(transport, TransportSidePanelDto.class);
    }
}
