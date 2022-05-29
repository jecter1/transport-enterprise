package ru.nsu.ccfit.mamchits.transportenterprise.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum EmployeePosition {
    WORKER("Рабочий"),
    BRIGADE_LEADER("Бригадир"),
    MASTER("Мастер"),
    HEAD_OF_SECTION("Начальник участка"),
    FOREMAN("Начальник цеха");

    private String code;

    private EmployeePosition(String code) {
        this.code=code;
    }

    @JsonCreator
    public static EmployeePosition decode(final String code) {
        return Stream.of(EmployeePosition.values()).filter(targetEnum -> targetEnum.code.equals(code)).findFirst().orElse(null);
    }

    @JsonValue
    public String getCode() {
        return code;
    }
}
