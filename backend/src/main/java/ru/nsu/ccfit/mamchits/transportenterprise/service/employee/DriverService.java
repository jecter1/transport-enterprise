package ru.nsu.ccfit.mamchits.transportenterprise.service.employee;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.employee.DriverDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Driver;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.employee.DriverRepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverService {
    private final DriverRepository driverRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Optional<DriverDto> findById(Long id) {
        return driverRepository.findById(id).map(this::convertToDto);
    }

    public List<DriverDto> findAllByTransportId(Long transportId) {
        return driverRepository.findAll()
                .stream()
                .filter(driver -> Objects.equals(driver.getTransport().getId(), transportId))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private DriverDto convertToDto(Driver driver) {
        DriverDto driverDto = modelMapper.map(driver, DriverDto.class);
        driverDto.setBirthDate(driver.getEmployee().getBirthDate());
        driverDto.setName(driver.getEmployee().getName());
        driverDto.setPosition(driver.getEmployee().getPosition());
        Transport transport = driver.getTransport();
        if (transport != null) {
            driverDto.setTransportId(transport.getId());
            driverDto.setTransportBrand(transport.getBrand());
            driverDto.setTransportModel(transport.getModel());
            driverDto.setTransportColor(transport.getColor());
            driverDto.setTransportNumber(transport.getNumber());
            driverDto.setTransportType(transport.getType());
        }
        return driverDto;
    }
}
