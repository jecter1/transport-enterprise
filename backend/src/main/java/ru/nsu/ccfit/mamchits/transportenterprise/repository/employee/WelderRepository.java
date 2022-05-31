package ru.nsu.ccfit.mamchits.transportenterprise.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Welder;

@Repository
public interface WelderRepository extends JpaRepository<Welder, Long> {
}
