package ru.nsu.ccfit.mamchits.transportenterprise.entity.employee;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.repair.Repair;

import javax.persistence.*;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "Service_staff")
public class ServiceStaff {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany(mappedBy = "serviceStaffSet")
    private Set<Repair> repairSet;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "id", nullable = false)
    private Employee employee;

    @OneToOne(mappedBy = "serviceStaff", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Technician technician;

    @OneToOne(mappedBy = "serviceStaff", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Welder welder;

    @OneToOne(mappedBy = "serviceStaff", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Locksmith locksmith;

    @OneToOne(mappedBy = "serviceStaff", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Assembler assembler;
}
