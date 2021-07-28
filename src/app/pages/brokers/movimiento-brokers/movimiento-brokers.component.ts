import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alerta } from 'src/app/lib/alert';
import { IDSIMSS, statusMovimiento } from '../../administrador/interfaces/brokers';
import { StatusmovimientosService } from '../../administrador/status-movimientos/statusmovimientos.service';
import { IdsService } from '../alta-ids/ids.service';
import { MovimientoBService } from './movimiento-b.service';

@Component({
  selector: 'app-movimiento-brokers',
  templateUrl: './movimiento-brokers.component.html',
  styleUrls: ['./movimiento-brokers.component.css']
})
export class MovimientoBrokersComponent implements OnInit {
  buscaEmp: string = "";
  isdImss: IDSIMSS[] = [];
  registerForm: FormGroup;
  statusMovimitos: statusMovimiento[] = [];
  idMovimiento: string = "";
  constructor(private moviS: MovimientoBService,  private formBuilder: FormBuilder , private statuMoService: StatusmovimientosService, private idsService: IdsService ) { }

  ngOnInit(): void {
    this.initForm();
    this.getStatus();
  }
  initForm(){
    this.registerForm = this.formBuilder.group({
      idEmpresa: ['', Validators.required],
      idEmpleado: ['', Validators.required],
      tipoMovimiento: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: [''],
      nombres: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      numSocial: ['', Validators.required],
      sd: ['', Validators.required],
      salarioInt: ['', Validators.required],
      curp: ['', Validators.required],
      rfc: [''],
      fechaMovimiento: ['', Validators.required],
      aportacionInfonavid: [''],
      creditoInfonavidVigente: [''],
      numeroCredito: [''],
      montoDescuentoCFVSMFD: [''],
      fechaAlta: [''],
      incidencia: [''],
      fechaBaja: [''],
      salarioBase: [''],
      claveTrabajador: [''],
      tipoTrabajador: ['', Validators.required],
      tipoSalario: ['', Validators.required],
      semanaJornadaReducida: [''],
      unidadMedicinaFamiliar: [''],
      guia: [''],
      claveUnica: [''],
      identificadorFormato: [''],
      digitoVerificadorRP: [''],
      digitoVerificadorNSS: [''],
      terminacion: [''],
      emaMes: [''],
      dias: [''],
      causaBaja: [''],
      tipoJornada: [''],
      umf: [''],
      subdelegacion: ['']
    });
  }

  buscaMovi(){
    this.moviS.getBrokers(this.buscaEmp).then((resp:any)=>{
      this.isdImss = resp;
    })
  }
  llenaForm(amp:IDSIMSS){
    this.registerForm.controls["tipoMovimiento"].setValue(amp.tipoMovimiento);
    this.registerForm.controls["apellidoPaterno"].setValue(amp.apellidoPaterno);
    this.registerForm.controls["apellidoMaterno"].setValue(amp.apellidoMaterno);
    this.registerForm.controls["nombres"].setValue(amp.nombres);
    this.registerForm.controls["nombreCompleto"].setValue(amp.nombreCompleto);
    this.registerForm.controls["numSocial"].setValue(amp.numSocial);
    this.registerForm.controls["sd"].setValue(amp.sd);
    this.registerForm.controls["salarioInt"].setValue(amp.salarioInt);
    this.registerForm.controls["curp"].setValue(amp.curp);
    this.registerForm.controls["rfc"].setValue(amp.rfc);
    this.registerForm.controls["fechaMovimiento"].setValue(amp.fechaMovimiento);
    this.registerForm.controls["aportacionInfonavid"].setValue(amp.aportacionInfonavid);
    this.registerForm.controls["creditoInfonavidVigente"].setValue(amp.creditoInfonavidVigente);
    this.registerForm.controls["numeroCredito"].setValue(amp.numeroCredito);
    this.registerForm.controls["montoDescuentoCFVSMFD"].setValue(amp.montoDescuentoCFVSMFD);
    this.registerForm.controls["fechaAlta"].setValue(amp.fechaAlta);
    this.registerForm.controls["incidencia"].setValue(amp.incidencia);
    this.registerForm.controls["fechaBaja"].setValue(amp.fechaBaja);
    this.registerForm.controls["salarioBase"].setValue(amp.salarioBase);
    this.registerForm.controls["claveTrabajador"].setValue(amp.claveTrabajador);
    this.registerForm.controls["tipoTrabajador"].setValue(amp.tipoTrabajador);
    this.registerForm.controls["tipoSalario"].setValue(amp.tipoSalario);
    this.registerForm.controls["semanaJornadaReducida"].setValue(amp.semanaJornadaReducida);
    this.registerForm.controls["unidadMedicinaFamiliar"].setValue(amp.unidadMedicinaFamiliar);
    this.registerForm.controls["guia"].setValue(amp.guia);
    this.registerForm.controls["claveUnica"].setValue(amp.claveUnica);
    this.registerForm.controls["identificadorFormato"].setValue(amp.identificadorFormato);
    this.registerForm.controls["digitoVerificadorRP"].setValue(amp.digitoVerificadorRP);
    this.registerForm.controls["digitoVerificadorNSS"].setValue(amp.digitoVerificadorNSS);
    this.registerForm.controls["terminacion"].setValue(amp.terminacion);
    this.registerForm.controls["causaBaja"].setValue(amp.causaBaja);
    this.registerForm.controls["emaMes"].setValue(amp.emaMes);
    this.registerForm.controls["dias"].setValue(amp.dias);
    this.registerForm.controls["tipoJornada"].setValue(amp.tipoJornada);
    this.registerForm.controls["umf"].setValue(amp.umf);
    this.registerForm.controls["subdelegacion"].setValue(amp.subdelegacion);
    this.registerForm.controls["idEmpresa"].setValue(amp.idEmpresa._id);
    this.registerForm.controls["idEmpleado"].setValue(amp.idEmpleado);
    this.idMovimiento = amp._id;
  }
  actualizarMovimiento(){
      let inputData:any = {
        idEmpleado: this.registerForm.value.idEmpleado,
        idEmpresa: this.registerForm.value.idEmpresa,
        tipoMovimiento: this.registerForm.value.tipoMovimiento,
        apellidoPaterno: this.registerForm.value.apellidoPaterno,
        apellidoMaterno: this.registerForm.value.apellidoMaterno,
        nombres: this.registerForm.value.nombres,
        nombreCompleto: this.registerForm.value.nombreCompleto,
        numSocial: this.registerForm.value.numSocial,
        sd: parseFloat(this.registerForm.value.sd).toFixed(2),
        salarioInt: parseFloat(this.registerForm.value.salarioInt),
        curp: this.registerForm.value.curp, 
        rfc: this.registerForm.value.rfc, 
        fechaMovimiento: this.registerForm.value.fechaMovimiento, 
        aportacionInfonavid: this.registerForm.value.aportacionInfonavid, 
        creditoInfonavidVigente: this.registerForm.value.creditoInfonavidVigente,
        numeroCredito: this.registerForm.value.numeroCredito, 
        montoDescuentoCFVSMFD: this.registerForm.value.montoDescuentoCFVSMFD, 
        fechaAlta: this.registerForm.value.fechaAlta,
        incidencia: this.registerForm.value.incidencia,
        fechaBaja: this.registerForm.value.fechaBaja, 
        salarioBase: parseFloat(this.registerForm.value.salarioBase), 
        claveTrabajador: this.registerForm.value.claveTrabajador,
        tipoTrabajador: this.registerForm.value.tipoTrabajador, 
        tipoSalario: this.registerForm.value.tipoSalario, 
        semanaJornadaReducida: this.registerForm.value.semanaJornadaReducida, 
        unidadMedicinaFamiliar: this.registerForm.value.unidadMedicinaFamiliar, 
        guia: this.registerForm.value.guia, 
        claveUnica: this.registerForm.value.claveUnica, 
        identificadorFormato: this.registerForm.value.identificadorFormato, 
        digitoVerificadorRP: this.registerForm.value.digitoVerificadorRP,
        digitoVerificadorNSS: this.registerForm.value.digitoVerificadorNSS, 
        terminacion: this.registerForm.value.terminacion,
        causaBaja: this.registerForm.value.causaBaja, 
        tipoJornada: this.registerForm.value.tipoJornada, 
        umf: this.registerForm.value.umf,
        subdelegacion: this.registerForm.value.subdelegacion, 
        status: 0
      }
      //console.log(inputData);
      
        this.idsService.registerIds([inputData]).then(resp=>{
          if(resp){
            alerta(true, "Registro completado correctamente");
            this.buscaMovi();
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
