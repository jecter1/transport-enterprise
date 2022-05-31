package ru.nsu.ccfit.mamchits.transportenterprise.entity.transport;


import lombok.Data;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.route.Route;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Route_transport")
public class RouteTransport {
    @Id
    private Long id;

    private Integer fare;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private PassengerTransport passengerTransport;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="route_id")
    private Route route;

    @OneToOne(mappedBy = "routeTransport", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Bus bus;

    @OneToOne(mappedBy = "routeTransport", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Minibus minibus;
}
