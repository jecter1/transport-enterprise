package ru.nsu.ccfit.mamchits.transportenterprise.entity.transport;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Bus")
public class Bus {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private RouteTransport routeTransport;
}
