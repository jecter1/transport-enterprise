package ru.nsu.ccfit.mamchits.transportenterprise.dto;

public interface DriverDto {
    Integer getId();
    String getName();
    String getBirthDate();
    String getPosition();
    Integer getChiefId();
    String getChiefName();
    Integer getTransportId();
    String getTransportBrand();
    String getTransportModel();
    String getTransportColor();
    String getTransportNumber();
    String getTransportType();
    String getTransportReceiveDate();
    String getTransportDecommissioningDate();
}
