package ru.nsu.ccfit.mamchits.transportenterprise.dto;

public interface TransportRouteDto {
    Integer getId();
    String getNumber();
    String getBrand();
    String getModel();
    String getColor();
    String getType();
    Integer getRouteId();
    Integer getRouteNumber();
    String getRouteStart();
    String getRouteFinish();
    Integer getCapacity();
    Float getFare();
}
