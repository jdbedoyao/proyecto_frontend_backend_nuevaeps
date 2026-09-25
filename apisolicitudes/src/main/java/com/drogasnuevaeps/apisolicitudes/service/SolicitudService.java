package com.drogasnuevaeps.apisolicitudes.service;

import com.drogasnuevaeps.apisolicitudes.dto.SolicitudRequest;
import com.drogasnuevaeps.apisolicitudes.entity.Medicamento;
import com.drogasnuevaeps.apisolicitudes.entity.Solicitud;
import com.drogasnuevaeps.apisolicitudes.repository.MedicamentoRepository;
import com.drogasnuevaeps.apisolicitudes.repository.SolicitudRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitudService {

    private final SolicitudRepository solicitudRepository;
    private final MedicamentoRepository medicamentoRepository;

    public SolicitudService(SolicitudRepository solicitudRepository, MedicamentoRepository medicamentoRepository) {
        this.solicitudRepository = solicitudRepository;
        this.medicamentoRepository = medicamentoRepository;
    }

    public List<Medicamento> listarMedicamentos() {
        return medicamentoRepository.findAll();
    }

    public Solicitud crearSolicitud(SolicitudRequest request, Long usuarioId) {
        Medicamento medicamento = medicamentoRepository.findById(request.getMedicamentoId())
                .orElseThrow(() -> new RuntimeException("Medicamento no encontrado"));

        // Validación condicional: Si NO ES POS, exigir los campos adicionales
        if (Boolean.FALSE.equals(medicamento.getEsPos())) {
            if (esInvalido(request.getNumeroOrden()) ||
                    esInvalido(request.getDireccion()) ||
                    esInvalido(request.getTelefono()) ||
                    esInvalido(request.getCorreo())) {
                throw new IllegalArgumentException(
                        "Para medicamentos NO POS, los campos numeroOrden, direccion, telefono y correo son obligatorios."
                );
            }
        }

        Solicitud solicitud = new Solicitud();
        solicitud.setUsuarioId(usuarioId);
        solicitud.setMedicamento(medicamento);
        solicitud.setNumeroOrden(request.getNumeroOrden());
        solicitud.setDireccion(request.getDireccion());
        solicitud.setTelefono(request.getTelefono());
        solicitud.setCorreo(request.getCorreo());

        return solicitudRepository.save(solicitud);
    }

    private boolean esInvalido(String valor) {
        return valor == null || valor.trim().isEmpty();
    }

    public List<Solicitud> obtenerSolicitudesPorUsuario(Long usuarioId) {
        return solicitudRepository.findByUsuarioId(usuarioId);
    }
}