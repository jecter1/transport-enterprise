package ru.nsu.ccfit.mamchits.transportenterprise.type.converter;

import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeeType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class EmployeeTypeConverter implements AttributeConverter<EmployeeType, String> {
    @Override
    public String convertToDatabaseColumn(EmployeeType type) {
        if (type == null) {
            return null;
        }
        return type.getCode();
    }

    @Override
    public EmployeeType convertToEntityAttribute(String code) {
        return EmployeeType.decode(code);
    }
}
