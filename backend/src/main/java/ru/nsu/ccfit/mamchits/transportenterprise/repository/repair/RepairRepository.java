package ru.nsu.ccfit.mamchits.transportenterprise.repository.repair;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;

@Repository
public interface RepairRepository extends JpaRepository<Repair, Long> {
}
