package ru.nsu.ccfit.mamchits.transportenterprise.dto.transport;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

@Getter
@Setter
public class TransportSidePanelDto {
    private Long id;
    private String brand;
    private String model;
    private String color;
    private String number;
    private TransportType type;
}
