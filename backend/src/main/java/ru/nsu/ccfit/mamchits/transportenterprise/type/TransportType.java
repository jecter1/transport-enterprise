package ru.nsu.ccfit.mamchits.transportenterprise.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public enum TransportType {
    AUXILIARY("Вспомогательный"),
    FREIGHT("Грузовой"),
    PASSENGER("Пассажирский"),
    CAR("Легковой"),
    TAXI("Такси"),
    ROUTE("Маршрутный"),
    BUS("Автобус"),
    MINIBUS("Маршрутное такси");

    private String code;

    private TransportType(String code) {
        this.code = code;
    }

    @JsonCreator
    public static TransportType decode(final String code) {
        return Stream.of(TransportType.values()).filter(targetEnum -> targetEnum.code.equals(code)).findFirst().orElse(null);
    }

    @JsonValue
    public String getCode() {
        return code;
    }

    public List<TransportType> getChildTypes() {
        return switch (this) {
            case AUXILIARY -> List.of(AUXILIARY);
            case FREIGHT -> List.of(FREIGHT);
            case PASSENGER -> List.of(PASSENGER, CAR, TAXI, ROUTE, BUS, MINIBUS);
            case CAR -> List.of(CAR);
            case TAXI -> List.of(TAXI);
            case ROUTE -> List.of(ROUTE, BUS, MINIBUS);
            case BUS -> List.of(BUS);
            case MINIBUS -> List.of(MINIBUS);
        };
    }
}
