package ru.nsu.ccfit.mamchits.transportenterprise.entity.usage;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Calendar;

@Getter
@Setter
@Entity
@Table(name = "Transport_usage")
public class TransportUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Calendar startDatetime;

    @Temporal(TemporalType.TIMESTAMP)
    private Calendar endDatetime;

    private Float mileage;

    @OneToOne(mappedBy = "transportUsage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private PassengerTransportUsage passengerTransportUsage;

    @OneToOne(mappedBy = "transportUsage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private FreightTransportUsage freightTransportUsage;

    @OneToOne(mappedBy = "transportUsage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private AuxiliaryTransportUsage auxiliaryTransportUsage;

}
