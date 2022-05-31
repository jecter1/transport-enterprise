package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.employee.EmployeeListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.employee.EmployeePageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.employee.EmployeeSidePanelDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Driver;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Employee;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.ServiceStaff;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.employee.EmployeeRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.repair.RepairRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.transport.TransportRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final RepairRepository repairRepository;
    private final TransportRepository transportRepository;

    @Autowired
    private ModelMapper modelMapper;

    public boolean deleteById(Long id) {
        Employee employee = employeeRepository.findById(id).orElse(null);
        if (employee == null) {
            return false;
        }
        System.out.println("Удаляется пользователь #" + employee.getId());
        employeeRepository.deleteById(id);
        return true;
    }

    public List<EmployeeSidePanelDto> findByTransportId(Long transportId) {
        return transportRepository
                .findById(transportId)
                .map(Transport::getDriverSet)
                .map(Collection::stream)
                .map(driverStream ->
                        driverStream
                                .map(Driver::getEmployee)
                                .map(this::convertToSidePanelDto)
                                .collect(Collectors.toList())).orElse(new ArrayList<>());
    }

    public List<EmployeeSidePanelDto> findSubordinatesById(Long id) {
        return employeeRepository
                .findById(id)
                .map(this::findAllSubordinatesOfEmployee)
                .map(Collection::stream)
                .map(employeeStream ->
                        employeeStream
                                .map(this::convertToSidePanelDto)
                                .collect(Collectors.toList())).orElse(new ArrayList<>());
    }

    public List<EmployeeSidePanelDto> findByRepairId(Long repairId) {
        return repairRepository
                    .findById(repairId)
                    .map(Repair::getServiceStaffSet)
                    .map(Collection::stream)
                    .map(serviceStaffStream ->
                            serviceStaffStream
                                    .map(ServiceStaff::getEmployee)
                                    .map(this::convertToSidePanelDto)
                                    .collect(Collectors.toList())).orElse(new ArrayList<>());
    }

    public Optional<EmployeePageDto> findById(Long id) {
        return employeeRepository.findById(id).map(this::convertToPageDto);
    }

    public List<EmployeeListInfoDto> findAll() {
        return employeeRepository.findAll().stream().map(this::convertToListInfoDto).collect(Collectors.toList());
    }

    public List<EmployeeSidePanelDto> findSuperiorsById(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isEmpty()) {
            return new ArrayList<>();
        }

        List<EmployeeSidePanelDto> employeeSuperiorList = new ArrayList<>();

        Employee chief = employee.get().getChief();
        while (chief != null) {
            employeeSuperiorList.add(convertToSidePanelDto(chief));
            chief = chief.getChief();
        }

        return employeeSuperiorList;
    }

    private List<Employee> findAllSubordinatesOfEmployee(Employee employee) {
        List<Employee> employeeSubordinateList = new ArrayList<>();
        Set<Employee> layerSubordinateSet = employee.getSubordinateSet();

        int length;
        int newLength = 0;
        do {
            length = newLength;
            employeeSubordinateList.addAll(layerSubordinateSet);
            layerSubordinateSet = findSubordinatesOfEmployeeSet(layerSubordinateSet);
            newLength = employeeSubordinateList.size();
        } while (newLength != length);

        return employeeSubordinateList;
    }

    private Set<Employee> findSubordinatesOfEmployeeSet(Set<Employee> employeeSet) {
        return employeeSet.stream()
                .map(Employee::getSubordinateSet)
                .flatMap(Set::stream)
                .collect(Collectors.toSet());
    }

    private EmployeeListInfoDto convertToListInfoDto(Employee employee) {
        EmployeeListInfoDto employeeListInfoDto = modelMapper.map(employee, EmployeeListInfoDto.class);
        employeeListInfoDto.setBirthDate(employee.getBirthDate());
        Employee chief = employee.getChief();
        if (chief != null) {
            employeeListInfoDto.setChiefName(chief.getName());
            employeeListInfoDto.setChiefId(chief.getId());
        }
        return employeeListInfoDto;
    }

    private EmployeePageDto convertToPageDto(Employee employee) {
        EmployeePageDto employeePageDto = modelMapper.map(employee, EmployeePageDto.class);
        employeePageDto.setBirthDate(employee.getBirthDate());
        ServiceStaff serviceStaff = employee.getServiceStaff();
        if (serviceStaff != null) {
            employeePageDto.setRepairsCount(serviceStaff.getRepairSet().size());
        }
        return employeePageDto;
    }

    private EmployeeSidePanelDto convertToSidePanelDto(Employee employee) {
        return modelMapper.map(employee, EmployeeSidePanelDto.class);
    }
}
