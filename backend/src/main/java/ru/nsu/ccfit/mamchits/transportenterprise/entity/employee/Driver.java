package ru.nsu.ccfit.mamchits.transportenterprise.entity.employee;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name="Driver")
public class Driver {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="transport_id")
    private Transport transport;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private Employee employee;
}
