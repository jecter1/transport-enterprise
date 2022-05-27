package ru.nsu.ccfit.mamchits.transportenterprise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Garage;

@Repository
public interface GarageRepository extends JpaRepository<Garage, Integer> {
}
