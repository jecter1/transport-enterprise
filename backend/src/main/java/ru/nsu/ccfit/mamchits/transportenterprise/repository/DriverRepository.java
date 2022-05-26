package ru.nsu.ccfit.mamchits.transportenterprise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.DriverDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Driver;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {

    @Query(nativeQuery = true, value =
            "SELECT\n" +
            "   e1.id,\n" +
            "   e1.name,\n" +
            "   e1.birth_date AS birthDate,\n" +
            "   e1.employee_position AS position,\n" +
            "   e1.chief_id AS chiefId,\n" +
            "   e2.name AS chiefName,\n" +
            "   t.id AS transportId,\n" +
            "   t.brand AS transportBrand,\n" +
            "   t.model AS transportModel,\n" +
            "   t.color AS transportColor,\n" +
            "   t.number AS transportNumber,\n" +
            "   t.transport_type AS transportType,\n" +
            "   t.receive_date AS transportReceiveDate,\n" +
            "   t.decommissioning_date AS transportDecommissioningDate\n" +
            "FROM\n" +
            "   Driver d\n" +
            "   LEFT JOIN Employee e1 ON d.id = e1.id\n" +
            "   LEFT JOIN Employee e2 ON e1.chief_id = e2.id\n" +
            "   LEFT JOIN Transport t ON d.transport_id = t.id\n" +
            "WHERE\n" +
            "   :transportId = 0 OR d.transport_id = :transportId ;")
    List<DriverDto> findAllDrivers(@Param("transportId") int transportId);
}
