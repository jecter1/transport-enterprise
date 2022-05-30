package ru.nsu.ccfit.mamchits.transportenterprise.dto.repair;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeePosition;
import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeeType;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Getter
@Setter
public class RepairDto {

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy hh:mm");

    private Long id;
    private String assembly;
    private Float cost;
    private String startDatetime;
    private String endDatetime;
    private String description;

    private Long transportId;
    private String transportBrand;
    private String transportModel;
    private String transportColor;
    private String transportNumber;
    private TransportType transportType;

    private Long garageId;
    private String garageLocation;

    public void setStartDatetime(Calendar calendar) {
        this.startDatetime = (calendar != null) ? dateFormat.format(calendar.getTime()) : null;
    }

    public void setEndDatetime(Calendar calendar) {
        this.endDatetime = (calendar != null) ? dateFormat.format(calendar.getTime()) : null;
    }
}
