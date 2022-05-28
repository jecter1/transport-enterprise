package ru.nsu.ccfit.mamchits.transportenterprise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Route.TransportShortDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Route;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {
    @Query(nativeQuery = true, value =
            "SELECT \n" +
            "    t.id,\n" +
            "    t.number,\n" +
            "    t.brand,\n" +
            "    t.model,\n" +
            "    t.transport_type AS type\n" +
            "FROM\n" +
            "    Route r\n" +
            "    JOIN Route_transport rt ON r.id = rt.route_id\n" +
            "    JOIN Transport t ON rt.id = t.id\n" +
            "WHERE\n" +
            "    r.id = :id ;")
    List<TransportShortDto> findTransportById(@Param("id") int id);
}
