import { Component, OnInit } from '@angular/core';
import { alerta, AlertaElimina } from 'src/app/lib/alert';
import { statusMovimiento } from '../interfaces/brokers';
import { StatusmovimientosService } from './statusmovimientos.service';

@Component({
  selector: 'app-status-movimientos',
  templateUrl: './status-movimientos.component.html',
  styleUrls: ['./status-movimientos.component.css']
})
export class StatusMovimientosComponent implements OnInit {
  nombrestatus: string= "";
  statusMovimitos: statusMovimiento[] = [];
  idstatus: string = "";
  constructor(private statusService: StatusmovimientosService) { }

  ngOnInit(): void {
    this.getStatus();
  }
  getStatus(){
    this.statusService.getstatusM().then((resp:any)=>{
      this.statusMovimitos = resp;
    })
  }

  registerStatus(){
    let statusInput:statusMovimiento = {
      _id: this.idstatus,
      nombre: this.nombrestatus,
      status: 1
    }
    if(this.nombrestatus != ""){
      if(this.idstatus == ""){
        this.statusService.registerStatus(statusInput).then(resp=>{
          if(resp){
            alerta(true, "Estatus agregado correctamente");
            this.getStatus();
            this,this.nombrestatus = "";
          }else{
            alerta(false, "ha ocurrido un error");
          }
        })
      }else{
        this.statusService.upadteStatus(statusInput).then(resp=>{
          if(resp){
            alerta(true, "Estatus actualizado correctamente");
            this.getStatus();
            this,this.nombrestatus = "";
          }else{
            alerta(false, "ha ocurrido un error");
          }
        })
      }
    }
  }
  llenaForm(status: statusMovimiento){
    this.nombrestatus = status.nombre || "";
    this.idstatus = status._id || "";
  }
  eliminarStatus(status: statusMovimiento){
    let statusInpu: statusMovimiento = {
      _id: status._id,
      nombre: status.nombre,
      status: 0
    }
    AlertaElimina("desea eliminar este estatus?").then(resp=>{
      if(resp){
        this.statusService.upadteStatus(statusInpu).then(resp=>{
          if(resp){
            alerta(true, "Estatus eliminado correctamente");
            this.getStatus();
            this,this.nombrestatus = "";
          }else{
            alerta(false, "ha ocurrido un error");
          }
        })
      }
    })
  }
}
