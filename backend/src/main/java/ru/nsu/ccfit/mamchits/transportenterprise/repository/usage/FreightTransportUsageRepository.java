package ru.nsu.ccfit.mamchits.transportenterprise.repository.usage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.FreightTransport;

@Repository
public interface FreightTransportUsageRepository extends JpaRepository<FreightTransport, Long> {
}
