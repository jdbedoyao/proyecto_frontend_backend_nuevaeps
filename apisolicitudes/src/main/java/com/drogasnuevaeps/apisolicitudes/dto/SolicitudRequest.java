package com.drogasnuevaeps.apisolicitudes.dto;

import jakarta.validation.constraints.NotNull;

public class SolicitudRequest {

    @NotNull(message = "El ID del medicamento es obligatorio")
    private Long medicamentoId;

    private String numeroOrden;
    private String direccion;
    private String telefono;
    private String correo;

    public Long getMedicamentoId() { return medicamentoId; }
    public void setMedicamentoId(Long medicamentoId) { this.medicamentoId = medicamentoId; }

    public String getNumeroOrden() { return numeroOrden; }
    public void setNumeroOrden(String numeroOrden) { this.numeroOrden = numeroOrden; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
}