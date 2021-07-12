import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokersComponent } from './pages/administrador/brokers/brokers.component';
import { InicioComponent } from './pages/administrador/inicio/inicio.component';
import { StatusMovimientosComponent } from './pages/administrador/status-movimientos/status-movimientos.component';
import { AltaIdsComponent } from './pages/brokers/alta-ids/alta-ids.component';
import { DashboardComponent } from './pages/brokers/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'brokers',
    children: [
      {
        path: 'inicio', component: DashboardComponent
      },
      {
        path: 'alta-ids', component: AltaIdsComponent
      }
    ]
  },
  {
    path: 'administrador',
    children: [
      {
        path: 'inicio', component: InicioComponent
      },
      {
        path: 'brokers', component: BrokersComponent
      },
      {
        path: 'statusMovimoentos', component: StatusMovimientosComponent
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
