import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { LoginComponent } from './pages/login/login';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes';
import { ConsultaSolicitudesComponent } from  './pages/consulta-solicitudes/consulta-solicitudes';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'solicitudes', component: SolicitudesComponent, canActivate: [authGuard] },
  { path: 'consulta-solicitudes', component: ConsultaSolicitudesComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },

];