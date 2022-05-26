package ru.nsu.ccfit.mamchits.transportenterprise.dto;

public interface EmployeeRepairDto {
    String getTransportId();
    String getTransportBrand();
    String getTransportModel();
    String getTransportColor();
    String getTransportNumber();
    String getTransportType();
    String getDescription();
    String getGarageLocation();
    String getAssembly();
    Float getCost();
    String getStartDatetime();
    String getEndDatetime();
}
