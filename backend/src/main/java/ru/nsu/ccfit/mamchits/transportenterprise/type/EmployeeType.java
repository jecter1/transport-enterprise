package ru.nsu.ccfit.mamchits.transportenterprise.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum EmployeeType {
    DRIVER("Водитель"),
    SERVICE_STAFF("Обслуживающий персонал"),
    TECHNICIAN("Техник"),
    WELDER("Сварщик"),
    LOCKSMITH("Слесарь"),
    ASSEMBLER("Сборщик");

    private String code;

    private EmployeeType(String code) {
        this.code=code;
    }

    @JsonCreator
    public static EmployeeType decode(final String code) {
        return Stream.of(EmployeeType.values()).filter(targetEnum -> targetEnum.code.equals(code)).findFirst().orElse(null);
    }

    @JsonValue
    public String getCode() {
        return code;
    }
}
