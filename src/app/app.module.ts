import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { GraphQLModule } from './api/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/brokers/dashboard/dashboard.component';
import { ComponentsModule } from './components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BuscarPipe } from './pipes/buscar.pipe';
import { AltaIdsComponent } from './pages/brokers/alta-ids/alta-ids.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { InicioComponent } from './pages/administrador/inicio/inicio.component';
import { BrokersComponent } from './pages/administrador/brokers/brokers.component';
import { StatusMovimientosComponent } from './pages/administrador/status-movimientos/status-movimientos.component';
import { PatronalesComponent } from './pages/administrador/patronales/patronales.component';
import { MovimientoBrokersComponent } from './pages/brokers/movimiento-brokers/movimiento-brokers.component';
import { InicioPipe } from './pages/administrador/inicio/inicio.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BuscarPipe,
    AltaIdsComponent,
    InicioComponent,
    BrokersComponent,
    StatusMovimientosComponent,
    PatronalesComponent,
    MovimientoBrokersComponent,
    InicioPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    NgxPaginationModule,
    NgSelectModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
