package ru.nsu.ccfit.mamchits.transportenterprise.entity.usage;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.AuxiliaryTransport;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Auxiliary_transport_usage")
public class AuxiliaryTransportUsage {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="transport_id", nullable = false)
    private AuxiliaryTransport auxiliaryTransport;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private TransportUsage transportUsage;
}
