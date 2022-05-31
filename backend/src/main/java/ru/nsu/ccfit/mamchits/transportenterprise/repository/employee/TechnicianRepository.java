package ru.nsu.ccfit.mamchits.transportenterprise.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Technician;

@Repository
public interface TechnicianRepository extends JpaRepository<Technician, Long> {
}
