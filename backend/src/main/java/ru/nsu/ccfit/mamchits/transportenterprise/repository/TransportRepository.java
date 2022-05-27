package ru.nsu.ccfit.mamchits.transportenterprise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.*;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Transport;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransportRepository extends JpaRepository<Transport, Integer> {

    @Query(nativeQuery = true, value =
            "SELECT\n" +
            "   id,\n" +
            "   brand,\n" +
            "   model,\n" +
            "   color,\n" +
            "   number,\n" +
            "   transport_type AS type\n" +
            "FROM\n" +
            "   Transport\n" +
            "WHERE\n" +
            "   id = :id ;")
    Optional<DriverTransportDto> findDriverTransportByTransportId(@Param("id") int id);

    @Query(nativeQuery = true, value =
            "SELECT\n" +
                    "   id,\n" +
                    "   number\n" +
                    "FROM\n" +
                    "   Transport ;")
    List<TransportNumberDto> findTransportNumbers();

    @Query(nativeQuery = true, value =
            "SELECT\n" +
                    "   t.id,\n" +
                    "   t.garage_id AS garageId,\n" +
                    "   g.location AS garageLocation,\n" +
                    "   t.brand,\n" +
                    "   t.model,\n" +
                    "   t.color,\n" +
                    "   t.number,\n" +
                    "   t.transport_type AS type,\n" +
                    "   t.receive_date AS receiveDate,\n" +
                    "   t.decommissioning_date AS decommissioningDate\n" +
                    "FROM\n" +
                    "   Transport t \n" +
                    "   LEFT JOIN Garage_facility g ON t.garage_id = g.id \n" +
                    "WHERE\n" +
                    "   t.id = :id ;")
    Optional<TransportInfoDto> findTransportInfoById(@Param("id") int id);

    @Query(nativeQuery = true, value =
            "SELECT\n" +
            "   t.id,\n" +
            "   t.garage_id AS garageId,\n" +
            "   g.location AS garageLocation,\n" +
            "   t.brand,\n" +
            "   t.model,\n" +
            "   t.color,\n" +
            "   t.number,\n" +
            "   t.transport_type AS type,\n" +
            "   t.receive_date AS receiveDate,\n" +
            "   t.decommissioning_date AS decommissioningDate\n" +
            "FROM\n" +
            "   Transport t \n" +
            "   LEFT JOIN Garage_facility g ON t.garage_id = g.id ;")
    List<TransportInfoDto> findAllInfo();

    @Query(nativeQuery = true, value =
            "SELECT\n" +
            "   e1.id,\n" +
            "   e1.name,\n" +
            "   t.id AS transportId,\n" +
            "   t.brand AS transportBrand,\n" +
            "   t.model AS transportModel,\n" +
            "   t.color AS transportColor,\n" +
            "   t.number AS transportNumber,\n" +
            "   t.transport_type AS transportType\n" +
            "FROM\n" +
            "   Transport t\n" +
            "   LEFT JOIN Driver d ON t.id = d.transport_id\n" +
            "   LEFT JOIN Employee e1 ON d.id = e1.id ;")
    List<TransportDriverDto> findAllDrivers();

    @Query(nativeQuery = true, value =
            "SELECT\n" +
            "   e.id,\n" +
            "   e.name\n" +
            "FROM\n" +
            "   Transport t\n" +
            "   LEFT JOIN Driver d ON t.id = d.transport_id\n" +
            "   LEFT JOIN Employee e ON d.id = e.id\n" +
            "WHERE\n" +
            "   t.id = :id ;")
    List<EmployeeNameDto> findTransportDrivers(@Param("id") int id);
}
