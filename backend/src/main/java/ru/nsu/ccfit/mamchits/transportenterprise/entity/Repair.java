package ru.nsu.ccfit.mamchits.transportenterprise.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "Repair")
public class Repair {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "garage_id", nullable = false)
    private Integer garageId;

    @Column(name = "transport_id", nullable = false)
    private Integer transportId;

    @Column(name = "assembly", nullable = false)
    private String assembly;

    @Column(name = "cost", nullable = false)
    private Float cost;

    @Column(name = "start_datetime")
    private String startDatetime;

    @Column(name = "end_datetime")
    private String endDatetime;

    @Column(name = "description")
    private String description;
}
