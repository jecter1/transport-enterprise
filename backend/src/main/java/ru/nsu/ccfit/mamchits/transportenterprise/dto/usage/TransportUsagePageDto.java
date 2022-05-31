package ru.nsu.ccfit.mamchits.transportenterprise.dto.usage;

import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Getter
@Setter
public class TransportUsagePageDto {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("hh:mm, dd.MM.yyyy");

    private Long id;
    private String startDatetime;
    private String endDatetime;
    private Float mileage;

    private Integer passengers;
    private Integer freightVolume;

    private Integer passengerCapacity;
    private Integer loadCapacity;

    public void setStartDatetime(Calendar calendar) {
        this.startDatetime = (calendar != null) ? dateFormat.format(calendar.getTime()) : null;
    }

    public void setEndDatetime(Calendar calendar) {
        this.endDatetime = (calendar != null) ? dateFormat.format(calendar.getTime()) : null;
    }
}
