package ru.nsu.ccfit.mamchits.transportenterprise.entity.transport;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.usage.AuxiliaryTransportUsage;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Auxiliary_transport")
public class AuxiliaryTransport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private Transport transport;

    @OneToMany(mappedBy="auxiliaryTransport", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AuxiliaryTransportUsage> auxiliaryTransportUsageSet;
}
