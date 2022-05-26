package ru.nsu.ccfit.mamchits.transportenterprise.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "Transport")
public class Transport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "garage_id")
    private Integer garageId;

    @Column(name = "brand")
    private String brand;

    @Column(name = "transport_type")
    private String type;

    @Column(name = "model")
    private String model;

    @Column(name = "color")
    private String color;

    @Column(name = "number")
    private String number;

    @Column(name = "receive_date")
    private String receiveDate;

    @Column(name = "decommissioning_date")
    private String decommissioningDate;
}
