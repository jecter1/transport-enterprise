package ru.nsu.ccfit.mamchits.transportenterprise.dto.route;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
@Setter
public class RouteCreateDto {
    private Integer number;
    private String startPoint;
    private String finishPoint;
}
