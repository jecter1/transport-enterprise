package ru.nsu.ccfit.mamchits.transportenterprise.entity.garage;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Garage_facility")
public class Garage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length=100)
    private String location;

    @Column(length=200)
    private String description;

    @OneToMany(mappedBy="garage", fetch = FetchType.LAZY)
    private Set<Transport> transportSet;

    @OneToMany(mappedBy="garage", fetch = FetchType.LAZY)
    private Set<Repair> repairSet;
}
