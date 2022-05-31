package ru.nsu.ccfit.mamchits.transportenterprise.repository.garage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;

@Repository
public interface GarageRepository extends JpaRepository<Garage, Long> {
}
