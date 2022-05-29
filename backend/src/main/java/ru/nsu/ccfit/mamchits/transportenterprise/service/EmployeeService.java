package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.employee.EmployeeDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Employee;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.EmployeeRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<EmployeeDto> findAll() {
        return employeeRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<EmployeeDto> findById(Long id) {
        return employeeRepository.findById(id).map(this::convertToDto);
    }

    public List<EmployeeDto> findSubordinatesById(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isEmpty()) {
            return new ArrayList<>();
        }

        List<Employee> subordinateList = findAllSubordinatesOfEmployee(employee.get());

        return subordinateList.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<EmployeeDto> findSuperiorsById(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isEmpty()) {
            return new ArrayList<>();
        }

        List<EmployeeDto> employeeSuperiorList = new ArrayList<>();

        Employee chief = employee.get().getChief();
        while (chief != null) {
            employeeSuperiorList.add(convertToDto(chief));
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
        Set<Employee> subordinateSet = new HashSet<>();
        return employeeSet.stream().map(Employee::getSubordinateSet).flatMap(Set::stream).collect(Collectors.toSet());
    }

    private EmployeeDto convertToDto(Employee employee) {
        EmployeeDto employeeDto = modelMapper.map(employee, EmployeeDto.class);
        employeeDto.setBirthDate(employee.getBirthDate());
        Employee chief = employee.getChief();
        if (chief != null) {
            employeeDto.setChiefName(chief.getName());
            employeeDto.setChiefId(chief.getId());
        }
        return employeeDto;
    }
}
