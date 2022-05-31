package ru.nsu.ccfit.mamchits.transportenterprise.dto.employee;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeHierarchyDto {
    private Long workerId;
    private String workerName;

    private Long brigadeLeaderId;
    private String brigadeLeaderName;

    private Long masterId;
    private String masterName;

    private Long sectionHeadId;
    private String sectionHeadName;

    private Long foremanId;
    private String foremanName;
}
