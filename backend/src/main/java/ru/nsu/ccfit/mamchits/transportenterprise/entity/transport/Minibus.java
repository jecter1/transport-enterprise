package ru.nsu.ccfit.mamchits.transportenterprise.entity.transport;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Minibus")
public class Minibus {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private RouteTransport routeTransport;
}
