import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudService } from '../../core/services/solicitud';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitudes.html'
})
export class SolicitudesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private solicitudService = inject(SolicitudService);
  private cdr = inject(ChangeDetectorRef); // <--- Inyectamos la detección de cambios
  public authService = inject(AuthService);
  private router = inject(Router);

  medicamentos: any[] = [];
  esNoPos: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';

  solicitudForm: FormGroup = this.fb.group({
    medicamentoId: ['', Validators.required],
    numeroOrden: [''],
    direccion: [''],
    telefono: [''],
    correo: ['']
  });

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos(): void {
    this.solicitudService.getMedicamentos().subscribe({
      next: (data) => {
        this.medicamentos = data;
        this.cdr.detectChanges(); // <--- Forzamos el renderizado de la vista
      },
      error: (err) => console.error('Error al cargar medicamentos:', err)
    });
  }

  onMedicamentoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = Number(selectElement.value);
    
    const med = this.medicamentos.find(m => m.id === selectedId);

    if (med) {
      const esMedicamentoPos = med.esPos !== undefined ? med.esPos : med.pos;
      this.esNoPos = !esMedicamentoPos;
    } else {
      this.esNoPos = false;
    }

    const camposNoPos = ['numeroOrden', 'direccion', 'telefono', 'correo'];

    if (this.esNoPos) {
      this.solicitudForm.get('numeroOrden')?.setValidators([Validators.required]);
      this.solicitudForm.get('direccion')?.setValidators([Validators.required]);
      this.solicitudForm.get('telefono')?.setValidators([Validators.required]);
      this.solicitudForm.get('correo')?.setValidators([Validators.required, Validators.email]);
    } else {
      camposNoPos.forEach(campo => {
        this.solicitudForm.get(campo)?.clearValidators();
        this.solicitudForm.get(campo)?.setValue('');
      });
    }

    camposNoPos.forEach(campo => {
      this.solicitudForm.get(campo)?.updateValueAndValidity();
    });

    this.cdr.detectChanges(); // <--- Forzamos actualización al cambiar de opción
  }

  onSubmit(): void {
    if (this.solicitudForm.invalid) {
      this.solicitudForm.markAllAsTouched();
      return;
    }

    this.solicitudService.crearSolicitud(this.solicitudForm.value).subscribe({
      next: () => {
        this.mensajeExito = 'Solicitud registrada correctamente';
        this.mensajeError = '';
        this.solicitudForm.reset();
        this.esNoPos = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.mensajeError = err.error?.message || 'Error al guardar la solicitud';
        this.mensajeExito = '';
        this.cdr.detectChanges();
      }
    });
  }

    listarSolicitudes(): void {
    this.router.navigate(['/consulta-solicitudes']);
  }
}