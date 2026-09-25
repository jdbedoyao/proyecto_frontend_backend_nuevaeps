import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../core/services/solicitud';
import { AuthService } from '../../core/services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta-solicitudes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consulta-solicitudes.html'
})
export class ConsultaSolicitudesComponent implements OnInit {
  private solicitudService = inject(SolicitudService);
  private cdr = inject(ChangeDetectorRef);
  public authService = inject(AuthService);

  solicitudes: any[] = [];
  cargando: boolean = true;
  mensajeError: string = '';

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes(): void {
    this.solicitudService.getSolicitudes().subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar solicitudes:', err);
        this.mensajeError = 'No se pudieron cargar las solicitudes.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}