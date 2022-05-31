package ru.nsu.ccfit.mamchits.transportenterprise.entity.transport;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.Driver;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Transport")
public class Transport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length=30)
    private String brand;

    @Column(nullable = false, length=30)
    private String model;

    @Column(length=20)
    private String color;

    @Column(length=6)
    private String number;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Calendar receiveDate;

    @Temporal(TemporalType.DATE)
    private Calendar decommissioningDate;

    @Column(nullable = false)
    private TransportType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="garage_id")
    private Garage garage;

    @OneToMany(mappedBy="transport", fetch = FetchType.LAZY)
    private Set<Driver> driverSet;

    @OneToMany(mappedBy="transport", fetch = FetchType.LAZY)
    private Set<Repair> repairSet;

    @OneToOne(mappedBy = "transport", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private PassengerTransport passengerTransport;

    @OneToOne(mappedBy = "transport", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private FreightTransport freightTransport;

    @OneToOne(mappedBy = "transport", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private AuxiliaryTransport auxiliaryTransport;
}
