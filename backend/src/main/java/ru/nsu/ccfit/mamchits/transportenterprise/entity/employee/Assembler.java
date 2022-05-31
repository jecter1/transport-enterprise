package ru.nsu.ccfit.mamchits.transportenterprise.entity.employee;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "Assembler")
public class Assembler {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private ServiceStaff serviceStaff;
}
