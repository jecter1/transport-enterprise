package ru.nsu.ccfit.mamchits.transportenterprise.dto.employee;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeePosition;
import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeeType;

@Getter
@Setter
public class EmployeeSidePanelDto {
    private Long id;
    private String name;
    private EmployeePosition position;
    private EmployeeType type;
}
