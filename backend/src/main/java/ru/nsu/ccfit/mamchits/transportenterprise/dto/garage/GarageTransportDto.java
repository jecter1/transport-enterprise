package ru.nsu.ccfit.mamchits.transportenterprise.dto.garage;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

@Getter
@Setter
public class GarageTransportDto {
    private Long id;
    private String location;

    private Long transportId;
    private String transportBrand;
    private String transportNumber;
    private String transportModel;
    private String transportColor;
    private TransportType transportType;
}
