package ru.nsu.ccfit.mamchits.transportenterprise.dto.repair;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepairSidePanelDto {
    private Long id;
    private String transportNumber;
    private String transportBrand;
    private String transportModel;
    private String assembly;
}
