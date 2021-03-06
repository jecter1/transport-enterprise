package ru.nsu.ccfit.mamchits.transportenterprise.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Driver;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    List<Driver> findByTransportId(Long transportId);
}
