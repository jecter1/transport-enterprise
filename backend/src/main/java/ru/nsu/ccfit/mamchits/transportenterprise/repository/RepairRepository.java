package ru.nsu.ccfit.mamchits.transportenterprise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.EmployeeRepairDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Repair.RepairFullInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Repair;

import java.util.List;

@Repository
public interface RepairRepository extends JpaRepository<Repair, Integer> {
    @Query(nativeQuery = true, value =
            "SELECT \n" +
            "    t.id AS transportId,\n" +
            "    t.brand AS transportBrand,\n" +
            "    t.model AS transportModel,\n" +
            "    t.color AS transportColor,\n" +
            "    t.number AS transportNumber,\n" +
            "    t.transport_type AS transportType,\n" +
            "    r.assembly,\n" +
            "    r.cost,\n" +
            "    r.start_datetime AS startDatetime,\n" +
            "    r.end_datetime AS endDatetime,\n" +
            "    r.description,\n" +
            "    gf.location AS garageLocation\n" +
            "FROM \n" +
            "    Repair_staff rs \n" +
            "    JOIN Service_staff ss ON rs.staff_id = ss.id\n" +
            "    JOIN Repair r ON rs.repair_id = r.id\n" +
            "    LEFT JOIN Garage_facility gf ON r.garage_id = gf.id\n" +
            "    JOIN Transport t ON r.transport_id = t.id\n" +
            "WHERE \n" +
            "    ss.id = :id AND\n" +
            "    ( :from LIKE '19000101' OR r.start_datetime > :from ) AND\n" +
            "    ( :to LIKE '19000101' OR r.end_datetime < :to ) AND\n" +
            "    ( :transport_id = 0 OR r.transport_id = :transport_id );")
    List<EmployeeRepairDto> findEmployeeRepairs(@Param("id") String id,
                                                @Param("from") String fromDatetime,
                                                @Param("to") String toDatetime,
                                                @Param("transport_id") String transportId);

    @Query(nativeQuery = true, value =
            "SELECT \n" +
            "    r.id,\n" +
            "    r.garage_id AS garageId,\n" +
            "    g.location AS garageLocation,\n" +
            "    r.assembly,\n" +
            "    r.cost,\n" +
            "    r.start_datetime AS startDatetime,\n" +
            "    r.end_datetime AS endDatetime,\n" +
            "    r.transport_id AS transportId,\n" +
            "    t.number AS transportNumber,\n" +
            "    t.brand AS transportBrand,\n" +
            "    t.model AS transportModel,\n" +
            "    t.color AS transportColor,\n" +
            "    t.transport_type AS transportType\n" +
            "FROM \n" +
            "    Repair r \n" +
            "    LEFT JOIN Garage_facility g ON r.garage_id = g.id\n" +
            "    JOIN Transport t ON r.transport_id = t.id ;")
    List<RepairFullInfoDto> findAllFullInfo();
}
