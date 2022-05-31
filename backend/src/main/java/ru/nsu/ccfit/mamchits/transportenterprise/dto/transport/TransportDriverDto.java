package ru.nsu.ccfit.mamchits.transportenterprise.dto.transport;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeePosition;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Getter
@Setter
public class TransportDriverDto {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

    private Long id;
    private String brand;
    private String number;
    private String model;
    private String color;
    private TransportType type;

    private Long driverId;
    private String driverName;
    private String driverBirthDate;
    private EmployeePosition driverPosition;

    public void setDriverBirthDate(Calendar calendar) {
        this.driverBirthDate = dateFormat.format(calendar.getTime());
    }
}