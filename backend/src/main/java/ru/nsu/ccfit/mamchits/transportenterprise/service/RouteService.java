package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.route.RouteListInfoDto;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.route.RoutePageDto;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.route.Route;
import ru.nsu.ccfit.mamchits.transportenterprise.entity.transport.RouteTransport;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.route.RouteRepository;
import ru.nsu.ccfit.mamchits.transportenterprise.repository.transport.RouteTransportRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteService {
    private final RouteRepository routeRepository;
    private final RouteTransportRepository routeTransportRepository;

    @Autowired
    private ModelMapper modelMapper;

    public boolean deleteById(Long id) {
        Route route = routeRepository.findById(id).orElse(null);
        if (route == null) {
            return false;
        }
        routeRepository.deleteById(id);
        return true;
    }

    public Optional<RoutePageDto> findByTransportId(Long transportId) {
        return routeTransportRepository.findById(transportId).map(RouteTransport::getRoute).map(this::convertToPageDto);
    }

    public Optional<RoutePageDto> findById(Long id) {
        return routeRepository.findById(id).map(this::convertToPageDto);
    }

    public List<RouteListInfoDto> findAll() {
        return routeRepository.findAll().stream().map(this::convertToListInfoDto).collect(Collectors.toList());
    }

    private RouteListInfoDto convertToListInfoDto(Route route) {
        return modelMapper.map(route, RouteListInfoDto.class);
    }

    private RoutePageDto convertToPageDto(Route route) {
        return modelMapper.map(route, RoutePageDto.class);
    }
}
