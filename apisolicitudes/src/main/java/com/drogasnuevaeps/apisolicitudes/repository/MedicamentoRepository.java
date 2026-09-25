package com.drogasnuevaeps.apisolicitudes.repository;

import com.drogasnuevaeps.apisolicitudes.entity.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {
}