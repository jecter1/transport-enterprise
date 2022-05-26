package ru.nsu.ccfit.mamchits.transportenterprise.dto;

public interface EmployeeHierarchyDto {
    Integer getWorkerId();
    String getWorkerName();
    Integer getBrigadeLeaderId();
    String getBrigadeLeaderName();
    Integer getMasterId();
    String getMasterName();
    Integer getHeadOfSectionId();
    String getHeadOfSectionName();
    Integer getForemanId();
    String getForemanName();
}
