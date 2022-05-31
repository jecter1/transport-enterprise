package ru.nsu.ccfit.mamchits.transportenterprise.dto.transport;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

@Getter
@Setter
public class RouteTransportRouteDto {
    private Long id;
    private String brand;
    private String number;
    private String model;
    private String color;
    private TransportType type;
    private Integer passengerCapacity;
    private Integer fare;

    private Long routeId;
    private Integer routeNumber;
    private String routeStartPoint;
    private String routeFinishPoint;
}
