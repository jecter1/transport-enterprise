package ru.nsu.ccfit.mamchits.transportenterprise.entity.employee;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeePosition;
import ru.nsu.ccfit.mamchits.transportenterprise.type.EmployeeType;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name="Employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length=50)
    private String name;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Calendar birthDate;

    @Column(nullable = false)
    private EmployeePosition position;

    private EmployeeType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="chief_id")
    private Employee chief;

    @OneToMany(mappedBy="chief", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Employee> subordinateSet;

    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Driver driver;

    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private ServiceStaff serviceStaff;
}
