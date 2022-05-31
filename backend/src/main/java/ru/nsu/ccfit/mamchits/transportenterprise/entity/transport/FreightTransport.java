package ru.nsu.ccfit.mamchits.transportenterprise.entity.transport;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.FreightTransportUsage;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Freight_transport")
public class FreightTransport {
    @Id
    private Long id;

    private Integer loadCapacity;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private Transport transport;

    @OneToMany(mappedBy="freightTransport", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<FreightTransportUsage> freightTransportUsageSet;
}
