package ru.nsu.ccfit.mamchits.transportenterprise.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "Employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "birth_date", nullable = false)
    private String birthDate;

    @Column(name = "employee_position", nullable = false)
    private String position;

    @Column(name = "employee_type")
    private String type;

    @Column(name = "chief_id")
    private Integer chiefId;
}
