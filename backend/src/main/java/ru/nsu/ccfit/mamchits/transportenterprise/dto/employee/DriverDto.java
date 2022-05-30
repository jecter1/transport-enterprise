package ru.nsu.ccfit.mamchits.transportenterprise.dto.employee;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeePosition;
import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Getter
@Setter
public class DriverDto {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

    private Long id;
    private String name;
    private String birthDate;
    private EmployeePosition position;

    private Long transportId;
    private String transportBrand;
    private String transportModel;
    private String transportColor;
    private String transportNumber;
    private TransportType transportType;

    public void setBirthDate(Calendar calendar) {
        this.birthDate = dateFormat.format(calendar.getTime());
    }
}
