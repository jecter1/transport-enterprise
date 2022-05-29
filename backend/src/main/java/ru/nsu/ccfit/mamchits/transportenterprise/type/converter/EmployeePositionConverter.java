package ru.nsu.ccfit.mamchits.transportenterprise.type.converter;

import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeePosition;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class EmployeePositionConverter implements AttributeConverter<EmployeePosition, String> {
    @Override
    public String convertToDatabaseColumn(EmployeePosition position) {
        if (position == null) {
            return null;
        }
        return position.getCode();
    }

    @Override
    public EmployeePosition convertToEntityAttribute(String code) {
        return EmployeePosition.decode(code);
    }
}
