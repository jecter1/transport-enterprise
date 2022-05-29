package ru.nsu.ccfit.mamchits.transportenterprise.type.converter;

import ru.nsu.ccfit.mamchits.transportenterprise.type.TransportType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class TransportTypeConverter implements AttributeConverter<TransportType, String> {
    @Override
    public String convertToDatabaseColumn(TransportType type) {
        if (type == null) {
            return null;
        }
        return type.getCode();
    }

    @Override
    public TransportType convertToEntityAttribute(String code) {
        return TransportType.decode(code);
    }
}
