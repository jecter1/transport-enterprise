package ru.nsu.ccfit.mamchits.transportenterprise.entity.usage;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.PassengerTransport;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Passenger_transport_usage")
public class PassengerTransportUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer passengers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="transport_id", nullable = false)
    private PassengerTransport passengerTransport;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private TransportUsage transportUsage;
}
