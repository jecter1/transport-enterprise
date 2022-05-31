package ru.nsu.ccfit.mamchits.transportenterprise.repository.transport;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.FreightTransport;

@Repository
public interface FreightTransportRepository extends JpaRepository<FreightTransport, Long> {
}
