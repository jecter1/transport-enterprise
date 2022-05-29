package ru.nsu.ccfit.mamchits.transportenterprise.entity.transport;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.PassengerTransportUsage;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Passenger_transport")
public class PassengerTransport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer passengerCapacity;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private Transport transport;

    @OneToOne(mappedBy = "passengerTransport", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Taxi taxi;

    @OneToOne(mappedBy = "passengerTransport", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Car car;

    @OneToOne(mappedBy = "passengerTransport", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private RouteTransport routeTransport;

    @OneToMany(mappedBy="passengerTransport", fetch = FetchType.LAZY)
    private Set<PassengerTransportUsage> passengerTransportUsageSet;
}
