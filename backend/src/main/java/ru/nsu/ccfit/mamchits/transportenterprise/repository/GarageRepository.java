package ru.nsu.ccfit.mamchits.transportenterprise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Garage.TransportGarageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.Garage.TransportShortDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Garage;

import java.util.List;

@Repository
public interface GarageRepository extends JpaRepository<Garage, Integer> {
    @Query(nativeQuery = true, value =
            "SELECT \n" +
            "    t.id,\n" +
            "    t.number,\n" +
            "    t.brand,\n" +
            "    t.model,\n" +
            "    t.transport_type AS type\n" +
            "FROM\n" +
            "    Garage_facility gf\n" +
            "    JOIN Transport t ON gf.id = t.garage_id\n" +
            "WHERE\n" +
            "    gf.id = :id ;")
    List<TransportShortDto> findTransportById(@Param("id") int id);

    @Query(nativeQuery = true, value =
            "SELECT \n" +
            "    t.id,\n" +
            "    t.number,\n" +
            "    t.brand,\n" +
            "    t.model,\n" +
            "    t.transport_type AS type,\n" +
            "    gf.id AS garageId,\n" +
            "    gf.location AS garageLocation\n" +
            "FROM\n" +
            "    Transport t\n" +
            "    LEFT JOIN Garage_facility gf ON gf.id = t.garage_id ;")
    List<TransportGarageDto> findAllTransportGarage();
}
