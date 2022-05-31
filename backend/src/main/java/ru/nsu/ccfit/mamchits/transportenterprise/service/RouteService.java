package ru.nsu.ccfit.mamchits.transportenterprise.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nsu.ccfit.mamchits.transportenterprise.dto.route.RouteCreateDto;
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

    public Long create(RouteCreateDto routeCreateDto) {
        if (routeCreateDto.getNumber() == null ||
                routeCreateDto.getNumber() <= 0 ||
                routeCreateDto.getFinishPoint() == null ||
                routeCreateDto.getStartPoint() == null) {
            return 0L;
        }
        Route route = convertToEntity(routeCreateDto);
        route = routeRepository.save(route);
        return route.getId();
    }

    public boolean deleteById(Long id) {
        Route route = routeRepository.findById(id).orElse(null);
        if (route == null) {
            return false;
        }
        routeRepository.deleteById(id);
        return routeRepository.findById(id).isEmpty();
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

    public Route convertToEntity(RouteCreateDto routeCreateDto) {
        return modelMapper.map(routeCreateDto, Route.class);
    }

    private RouteListInfoDto convertToListInfoDto(Route route) {
        return modelMapper.map(route, RouteListInfoDto.class);
    }

    private RoutePageDto convertToPageDto(Route route) {
        return modelMapper.map(route, RoutePageDto.class);
    }
}
