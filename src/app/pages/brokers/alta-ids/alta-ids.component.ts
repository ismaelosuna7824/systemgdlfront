import { Component, OnInit } from '@angular/core';
import { alerta } from 'src/app/lib/alert';
import { statusMovimiento } from '../../administrador/interfaces/brokers';
import { StatusmovimientosService } from '../../administrador/status-movimientos/statusmovimientos.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { Empleado, IDSMO } from '../interface/empleado';
import { IdsService } from './ids.service';

@Component({
  selector: 'app-alta-ids',
  templateUrl: './alta-ids.component.html',
  styleUrls: ['./alta-ids.component.css']
})
export class AltaIdsComponent implements OnInit {
  empleados: Empleado[] = [];
  idBroker:string;
  selectedEmp:any;
  tipoMovimiento:string = "ALTA";
  idse: IDSMO[] = [];
  buscaEmp: string = "";
  statusMovimitos: statusMovimiento[] = [];
  constructor(private empleadoService: DashboardService, private idsService: IdsService, private statuMoService: StatusmovimientosService) { 
    
  }

 async ngOnInit() {
    this.idBroker = await localStorage.getItem('broker') || "";
    this.getEmpleados(this.idBroker);
    this.getStatus();
  }
  getEmpleados(id:any){
    this.empleadoService.getEmpleados(id).then((resp:any)=>{
      this.empleados = resp;
    }); 
  }

  agregar(){
    const emp:Empleado[] = this.empleados.filter(obj => obj._id === this.selectedEmp);
    const apellidos = emp[0].apellidos?.split(" ") || "";
    const buscaEmp = this.idse.filter(ob => ob.idEmpleado === emp[0]._id);
    if(buscaEmp.length == 0){
      this.idse.push({
        idEmpleado: emp[0]._id,
        idEmpresa: this.idBroker,
        tipoMovimiento: this.tipoMovimiento,
        apellidoPaterno: apellidos[0] == null ? "" : apellidos[0].toUpperCase(),
        apellidoMaterno: apellidos[1] == null ? "" : apellidos[1].toUpperCase(),
        nombres: emp[0].nombres?.toUpperCase(),
        nombreCompleto: `${emp[0].nombres?.toUpperCase()} ${emp[0].apellidos?.toUpperCase()}`,
        numSocial: emp[0].numSeguro?.toUpperCase(),
        sd: 0,
        salarioInt: 0,
        curp: emp[0].curp?.toUpperCase(),
        rfc: emp[0].rfc?.toUpperCase(),
        fechaMovimiento: "",
        aportacionInfonavid: "",
        creditoInfonavidVigente: "",
        numeroCredito: 0,
        montoDescuentoCFVSMFD: 0,
        fechaAlta: "",
        incidencia: "",
        fechaBaja: "",
        salarioBase: 0,
        claveTrabajador: "",
        tipoTrabajador: "",
        tipoSalario: "",
        semanaJornadaReducida: "",
        unidadMedicinaFamiliar: "",
        guia: "",
        claveUnica: "",
        identificadorFormato: "",
        digitoVerificadorRP: "",
        digitoVerificadorNSS: "",
        terminacion: "00000000",
        causaBaja: ""
      });
    }else{
      alerta(false, "error, este empleado ya ha sido agregado a la lista")
    }
    //console.log(this.idse)
  }
  eliminarItem(i:any){
    this.idse.splice(i, 1);
    //console.log(this.idse)
  }
  registerIDS(){
    this.idsService.registerIds(this.idse).then(resp=>{
      if(resp){
        alerta(true, "Registro completado correctamente");
        this.idse = [];
      }else{
        alerta(false, "Ha ocurrido un error");
      }
    })
  }
  getStatus(){
    this.statuMoService.getstatusM().then((resp:any)=>{
      this.statusMovimitos = resp;
    })
  }
}