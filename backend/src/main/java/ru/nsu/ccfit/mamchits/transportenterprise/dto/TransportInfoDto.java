package ru.nsu.ccfit.mamchits.transportenterprise.dto;

public interface TransportInfoDto {
    Integer getId();
    Integer getGarageId();
    String getGarageLocation();
    String getBrand();
    String getModel();
    String getColor();
    String getNumber();
    String getReceiveDate();
    String getDecommissioningDate();
    String getType();
}
