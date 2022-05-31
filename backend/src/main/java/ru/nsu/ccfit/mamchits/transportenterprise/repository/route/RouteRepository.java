package ru.nsu.ccfit.mamchits.transportenterprise.repository.route;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.route.Route;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
}
