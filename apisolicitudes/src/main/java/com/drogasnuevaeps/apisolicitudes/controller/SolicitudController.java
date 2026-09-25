package com.drogasnuevaeps.apisolicitudes.controller;

import com.drogasnuevaeps.apisolicitudes.dto.SolicitudRequest;
import com.drogasnuevaeps.apisolicitudes.entity.Medicamento;
import com.drogasnuevaeps.apisolicitudes.entity.Solicitud;
import com.drogasnuevaeps.apisolicitudes.service.SolicitudService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
@CrossOrigin(origins = "http://localhost:4200")
public class SolicitudController {

    private final SolicitudService solicitudService;

    public SolicitudController(SolicitudService solicitudService) {
        this.solicitudService = solicitudService;
    }

    @GetMapping("/medicamentos")
    public ResponseEntity<List<Medicamento>> obtenerMedicamentos() {
        return ResponseEntity.ok(solicitudService.listarMedicamentos());
    }

    @PostMapping
    public ResponseEntity<Solicitud> crearSolicitud(@Valid @RequestBody SolicitudRequest request,
                                                    Authentication authentication) {
        // Extraemos el usuarioId que guardamos en los detalles del filtro JWT
        Long usuarioId = (Long) authentication.getDetails();
        return ResponseEntity.ok(solicitudService.crearSolicitud(request, usuarioId));
    }

    @GetMapping
    public ResponseEntity<List<Solicitud>> obtenerSolicitudesUsuario() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // Extraemos el usuarioId que se guardó en el authToken.setDetails(usuarioId) dentro del filtro JWT
        Long usuarioId = (Long) auth.getDetails();

        List<Solicitud> solicitudes = solicitudService.obtenerSolicitudesPorUsuario(usuarioId);
        return ResponseEntity.ok(solicitudes);
    }
}