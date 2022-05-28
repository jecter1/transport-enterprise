package ru.nsu.ccfit.mamchits.transportenterprise.dto.Repair;

public interface RepairProfileDto {
    Integer getId();
    Integer getGarageId();
    String getGarageLocation();
    String getAssembly();
    Float getCost();
    String getStartDatetime();
    String getEndDatetime();
    String getDescription();
    Integer getTransportId();
    String getTransportNumber();
    String getTransportBrand();
    String getTransportModel();
    String getTransportColor();
    String getTransportType();
}
