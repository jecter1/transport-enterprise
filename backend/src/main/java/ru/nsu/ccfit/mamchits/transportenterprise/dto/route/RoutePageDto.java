package ru.nsu.ccfit.mamchits.transportenterprise.dto.route;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoutePageDto {
    private Long id;
    private Integer number;
    private String startPoint;
    private String finishPoint;
}
