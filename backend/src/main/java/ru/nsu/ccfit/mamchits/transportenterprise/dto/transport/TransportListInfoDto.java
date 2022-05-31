package ru.nsu.ccfit.mamchits.transportenterprise.dto.transport;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Getter
@Setter
public class TransportListInfoDto {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

    private Long id;
    private String brand;
    private String model;
    private String color;
    private String number;
    private String receiveDate;
    private String decommissioningDate;
    private TransportType type;
    private Long garageId;
    private String garageLocation;

    public void setReceiveDate(Calendar calendar) {
        this.receiveDate = (calendar != null) ? dateFormat.format(calendar.getTime()) : null;
    }

    public void setDecommissioningDate(Calendar calendar) {
        this.decommissioningDate = (calendar != null) ? dateFormat.format(calendar.getTime()) : null;
    }
}
