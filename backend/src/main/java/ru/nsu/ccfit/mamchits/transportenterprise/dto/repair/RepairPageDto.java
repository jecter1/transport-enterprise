package ru.nsu.ccfit.mamchits.transportenterprise.dto.repair;

import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Getter
@Setter
public class RepairPageDto {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("hh:mm, dd.MM.yyyy");

    private Long id;
    private String assembly;
    private Float cost;
    private String startDatetime;
    private String endDatetime;
    private String description;

    public void setStartDatetime(Calendar calendar) {
        this.startDatetime = (calendar != null) ? dateFormat.format(calendar.getTime()) : null;
    }

    public void setEndDatetime(Calendar calendar) {
        this.endDatetime = (calendar != null) ? dateFormat.format(calendar.getTime()) : null;
    }
}
