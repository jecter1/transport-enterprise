package ru.nsu.ccfit.mamchits.transportenterprise.entity.usage;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.FreightTransport;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Freight_transport_usage")
public class FreightTransportUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer freightVolume;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="transport_id", nullable = false)
    private FreightTransport freightTransport;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private TransportUsage transportUsage;
}
