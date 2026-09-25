package com.drogasnuevaeps.auth.dto;

public class AuthResponse {
    private String token;
    private String email;
    private String nombre;
    private Long id;

    public AuthResponse(String token, String email, String nombre, Long id) {
        this.token = token;
        this.email = email;
        this.nombre = nombre;
        this.id = id;
    }

    public String getToken() { return token; }
    public String getEmail() { return email; }
    public String getNombre() { return nombre; }
    public Long getId() { return id; }
}
