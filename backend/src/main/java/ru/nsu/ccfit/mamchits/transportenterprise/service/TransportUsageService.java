package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.usage.TransportUsageListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.usage.TransportUsagePageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.AuxiliaryTransportUsage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.FreightTransportUsage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.PassengerTransportUsage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.TransportUsage;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.usage.TransportUsageRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransportUsageService {
    private final TransportUsageRepository transportUsageRepository;

    @Autowired
    private ModelMapper modelMapper;

    public boolean deleteById(Long id) {
        TransportUsage transportUsage = transportUsageRepository.findById(id).orElse(null);
        if (transportUsage == null) {
            return false;
        }
        transportUsageRepository.deleteById(id);
        return transportUsageRepository.findById(id).isEmpty();
    }

    public List<TransportUsageListInfoDto> findAll(Long transportId, TransportType transportType, String dateFrom, String dateTo) {
        return transportUsageRepository
                .findAll()
                .stream()
                .filter(transportUsage ->
                        dateBetween(transportUsage.getStartDatetime(), transportUsage.getEndDatetime(), dateFrom, dateTo))
                .map(this::convertToListInfoDto)
                .filter(dto ->
                        (transportId == null || Objects.equals(dto.getTransportId(), transportId)) &&
                        (transportType == null || dto.getTransportType().getParentTypes().contains(transportType)))
                .collect(Collectors.toList());
    }

    public Optional<TransportUsagePageDto> findById(Long id) {
        return transportUsageRepository.findById(id).map(this::convertToPageDto);
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

    private TransportUsageListInfoDto convertToListInfoDto(TransportUsage transportUsage) {
        TransportUsageListInfoDto transportUsageListInfoDto = modelMapper.map(transportUsage, TransportUsageListInfoDto.class);
        transportUsageListInfoDto.setStartDatetime(transportUsage.getStartDatetime());
        transportUsageListInfoDto.setEndDatetime(transportUsage.getEndDatetime());
        AuxiliaryTransportUsage auxiliaryTransportUsage = transportUsage.getAuxiliaryTransportUsage();
        FreightTransportUsage freightTransportUsage = transportUsage.getFreightTransportUsage();
        PassengerTransportUsage passengerTransportUsage = transportUsage.getPassengerTransportUsage();
        Transport transport;
        if (auxiliaryTransportUsage != null) {
            transport = auxiliaryTransportUsage.getAuxiliaryTransport().getTransport();
        } else if (freightTransportUsage != null) {
            transport = freightTransportUsage.getFreightTransport().getTransport();
            transportUsageListInfoDto.setFreightVolume(freightTransportUsage.getFreightVolume());
        } else if (passengerTransportUsage != null) {
            transport = passengerTransportUsage.getPassengerTransport().getTransport();
            transportUsageListInfoDto.setPassengers(passengerTransportUsage.getPassengers());
        } else {
            return transportUsageListInfoDto;
        }
        transportUsageListInfoDto.setTransportId(transport.getId());
        transportUsageListInfoDto.setTransportColor(transport.getColor());
        transportUsageListInfoDto.setTransportType(transport.getType());
        transportUsageListInfoDto.setTransportBrand(transport.getBrand());
        transportUsageListInfoDto.setTransportModel(transport.getModel());
        transportUsageListInfoDto.setTransportNumber(transport.getNumber());
        return transportUsageListInfoDto;
    }

    private TransportUsagePageDto convertToPageDto(TransportUsage transportUsage) {
        TransportUsagePageDto transportUsagePageDto = modelMapper.map(transportUsage, TransportUsagePageDto.class);
        transportUsagePageDto.setStartDatetime(transportUsage.getStartDatetime());
        transportUsagePageDto.setEndDatetime(transportUsage.getEndDatetime());
        AuxiliaryTransportUsage auxiliaryTransportUsage = transportUsage.getAuxiliaryTransportUsage();
        FreightTransportUsage freightTransportUsage = transportUsage.getFreightTransportUsage();
        PassengerTransportUsage passengerTransportUsage = transportUsage.getPassengerTransportUsage();
        Transport transport;
        if (auxiliaryTransportUsage != null) {
            transport = auxiliaryTransportUsage.getAuxiliaryTransport().getTransport();
        } else if (freightTransportUsage != null) {
            transport = freightTransportUsage.getFreightTransport().getTransport();
            transportUsagePageDto.setFreightVolume(freightTransportUsage.getFreightVolume());
            transportUsagePageDto.setLoadCapacity(freightTransportUsage.getFreightTransport().getLoadCapacity());
        } else if (passengerTransportUsage != null) {
            transport = passengerTransportUsage.getPassengerTransport().getTransport();
            transportUsagePageDto.setPassengers(passengerTransportUsage.getPassengers());
            transportUsagePageDto.setPassengerCapacity(passengerTransportUsage.getPassengerTransport().getPassengerCapacity());
        } else {
            return transportUsagePageDto;
        }
        return transportUsagePageDto;
    }
}
