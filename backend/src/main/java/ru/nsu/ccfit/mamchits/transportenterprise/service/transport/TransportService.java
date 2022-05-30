package ru.nsu.ccfit.mamchits.transportenterprise.service.transport;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.transport.TransportDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Driver;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Employee;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.employee.EmployeeRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.transport.TransportRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransportService {
    private final TransportRepository transportRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<TransportDto> findAll() {
        return transportRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<TransportDto> findById(Long id) {
        return transportRepository.findById(id).map(this::convertToDto);
    }

    public Optional<TransportDto> findByDriverId(Long driverId) {
        Optional<Employee> employee = employeeRepository.findById(driverId);
        if (employee.isEmpty()) {
            return Optional.empty();
        }
        Driver driver = employee.get().getDriver();
        if (driver == null) {
            return Optional.empty();
        }
        Transport transport = driver.getTransport();
        if (transport == null) {
            return Optional.empty();
        }
        return Optional.of(convertToDto(transport));
    }

    private TransportDto convertToDto(Transport transport) {
        TransportDto transportDto = modelMapper.map(transport, TransportDto.class);
        transportDto.setReceiveDate(transport.getReceiveDate());
        transportDto.setDecommissioningDate(transport.getDecommissioningDate());
        Garage garage = transport.getGarage();
        if (garage != null) {
            transportDto.setGarageId(garage.getId());
            transportDto.setGarageLocation(garage.getLocation());
        }
        return transportDto;
    }
}
