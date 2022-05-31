package ru.nsu.ccfit.mamchits.transportenterprise.entity.route;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.RouteTransport;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Route")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer number;

    @Column(nullable = false, length = 50)
    private String startPoint;

    @Column(nullable = false, length = 50)
    private String finishPoint;

    @OneToMany(mappedBy="route", fetch = FetchType.LAZY)
    private Set<RouteTransport> routeTransportSet;
}
