import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:10082/api/solicitudes';

  getMedicamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medicamentos`);
  }

  crearSolicitud(solicitud: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, solicitud);
  }

  getSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

}