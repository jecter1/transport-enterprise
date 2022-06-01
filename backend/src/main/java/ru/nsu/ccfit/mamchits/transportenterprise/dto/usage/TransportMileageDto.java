package ru.nsu.ccfit.mamchits.transportenterprise.dto.usage;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

@Getter
@Setter
public class TransportMileageDto {
    private Long id;
    private String brand;
    private String model;
    private String color;
    private String number;
    private TransportType type;
    private Float mileage;
}
