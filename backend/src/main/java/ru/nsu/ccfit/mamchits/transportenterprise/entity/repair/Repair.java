package ru.nsu.ccfit.mamchits.transportenterprise.entity.repair;

import lombok.Getter;
import lombok.Setter;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.employee.ServiceStaff;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.garage.Garage;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.Transport;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Repair")
public class Repair {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length = 50)
    private String assembly;

    private Float cost;

    @Temporal(TemporalType.TIMESTAMP)
    private Calendar startDatetime;

    @Temporal(TemporalType.TIMESTAMP)
    private Calendar endDatetime;

    @Column(length = 200)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="garage_id")
    private Garage garage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="transport_id", nullable = false)
    private Transport transport;

    @ManyToMany
    @JoinTable(
            name = "Repair_staff",
            joinColumns = @JoinColumn(name = "repair_id"),
            inverseJoinColumns = @JoinColumn(name = "staff_id")
    )
    private Set<ServiceStaff> serviceStaffSet;
}
