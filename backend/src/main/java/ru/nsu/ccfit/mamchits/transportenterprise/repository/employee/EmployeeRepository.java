package ru.nsu.ccfit.mamchits.transportenterprise.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Employee;
import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeePosition;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findAllByPosition(EmployeePosition position);
}
