package ru.nsu.ccfit.mamchits.transportenterprise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.EmployeeHierarchyDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.EmployeePositionDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.EmployeeWithChiefNameDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.Employee;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query(nativeQuery = true, value =
            "SELECT\n" +
            "   e1.id,\n" +
            "   e1.name,\n" +
            "   e1.birth_date AS birthDate,\n" +
            "   e1.employee_type AS type,\n" +
            "   e1.employee_position AS position,\n" +
            "   e1.chief_id AS chiefId,\n" +
            "   e2.name AS chiefName\n" +
            "FROM\n" +
            "   Employee e1\n" +
            "   LEFT JOIN Employee e2 ON e1.chief_id = e2.id")
    List<EmployeeWithChiefNameDto> findAllWithChiefName();

    @Query(nativeQuery = true, value =
            "SELECT\n" +
            "    e5.id AS foremanId,\n" +
            "    e5.name AS foremanName,\n" +
            "    e4.id AS headOfSectionId,\n" +
            "    e4.name AS headOfSectionName,\n" +
            "    e3.id AS masterId,\n" +
            "    e3.name AS masterName,\n" +
            "    e2.id AS brigadeLeaderId,\n" +
            "    e2.name AS brigadeLeaderName,\n" +
            "    e1.id AS workerId,\n" +
            "    e1.name AS workerName\n" +
            "FROM\n" +
            "    Employee e1\n" +
            "    LEFT JOIN Employee e2 ON e1.chief_id = e2.id\n" +
            "    LEFT JOIN Employee e3 ON e2.chief_id = e3.id\n" +
            "    LEFT JOIN Employee e4 ON e3.chief_id = e4.id\n" +
            "    LEFT JOIN Employee e5 ON e4.chief_id = e5.id\n" +
            "WHERE\n" +
            "    e1.employee_position LIKE \"Рабочий\" ;")
    List<EmployeeHierarchyDto> findHierarchy();

    @Query(nativeQuery = true, value =
            "WITH employee_chief AS (\n" +
                    "  SELECT\n" +
                    "      e.id AS id,\n" +
                    "      e.chief_id AS chief_1,\n" +
                    "      c1.chief_id AS chief_2,\n" +
                    "      c2.chief_id AS chief_3,\n" +
                    "      c3.chief_id AS chief_4\n" +
                    "  FROM\n" +
                    "      Employee e\n" +
                    "      LEFT JOIN Employee c1 ON c1.id = e.chief_id\n" +
                    "      LEFT JOIN Employee c2 ON c2.id = c1.chief_id\n" +
                    "      LEFT JOIN Employee c3 ON c3.id = c2.chief_id\n" +
                    ")\n" +
                    "SELECT \n" +
                    "    e.id,\n" +
                    "    e.name,\n" +
                    "    e.employee_position AS position\n" +
                    "FROM\n" +
                    "    Employee e\n" +
                    "    JOIN employee_chief ec ON e.id = ec.id\n" +
                    "WHERE\n" +
                    "    ec.chief_1 = :id OR\n" +
                    "    ec.chief_2 = :id OR\n" +
                    "    ec.chief_3 = :id OR\n" +
                    "    ec.chief_4 = :id ;")
    List<EmployeePositionDto> findSubordinatesById(@Param("id") int id);

    @Query(nativeQuery = true, value =
            "WITH employee_chief AS (\n" +
                    "  SELECT\n" +
                    "      e.id AS id,\n" +
                    "      e.chief_id AS chief_1,\n" +
                    "      c1.chief_id AS chief_2,\n" +
                    "      c2.chief_id AS chief_3,\n" +
                    "      c3.chief_id AS chief_4\n" +
                    "  FROM\n" +
                    "      Employee e\n" +
                    "      LEFT JOIN Employee c1 ON c1.id = e.chief_id\n" +
                    "      LEFT JOIN Employee c2 ON c2.id = c1.chief_id\n" +
                    "      LEFT JOIN Employee c3 ON c3.id = c2.chief_id\n" +
                    ")\n" +
                    "SELECT \n" +
                    "    e.id,\n" +
                    "    e.name,\n" +
                    "    e.employee_position AS position\n" +
                    "FROM\n" +
                    "    Employee e\n" +
                    "    JOIN employee_chief ec ON e.id = ec.chief_1\n" +
                    "WHERE\n" +
                    "    ec.id = :id \n" +
                    "UNION ALL\n" +
                    "SELECT \n" +
                    "    e.id,\n" +
                    "    e.name,\n" +
                    "    e.employee_position AS position\n" +
                    "FROM\n" +
                    "    Employee e\n" +
                    "    JOIN employee_chief ec ON e.id = ec.chief_2\n" +
                    "WHERE\n" +
                    "    ec.id = :id \n" +
                    "UNION ALL\n" +
                    "SELECT \n" +
                    "    e.id,\n" +
                    "    e.name,\n" +
                    "    e.employee_position AS position\n" +
                    "FROM\n" +
                    "    Employee e\n" +
                    "    JOIN employee_chief ec ON e.id = ec.chief_3\n" +
                    "WHERE\n" +
                    "    ec.id = :id \n" +
                    "UNION ALL\n" +
                    "SELECT \n" +
                    "    e.id,\n" +
                    "    e.name,\n" +
                    "    e.employee_position AS position\n" +
                    "FROM\n" +
                    "    Employee e\n" +
                    "    JOIN employee_chief ec ON e.id = ec.chief_4\n" +
                    "WHERE\n" +
                    "    ec.id = :id ;")
    List<EmployeePositionDto> findSuperiorsById(@Param("id") int id);
}
