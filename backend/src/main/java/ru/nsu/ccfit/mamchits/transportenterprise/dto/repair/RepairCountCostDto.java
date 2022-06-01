package ru.nsu.ccfit.mamchits.transportenterprise.dto.repair;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

@Getter
@Setter
public class RepairCountCostDto {
    private Long id;
    private String brand;
    private String model;
    private String color;
    private String number;
    private TransportType type;
    private Integer count;
    private Float cost;
}
