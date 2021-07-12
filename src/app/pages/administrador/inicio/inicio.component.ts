import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alerta } from 'src/app/lib/alert';
import { BrokersService } from '../brokers/brokers.service';
import { Brokers, IDSIMSS, statusMovimiento } from '../interfaces/brokers';
import { StatusmovimientosService } from '../status-movimientos/statusmovimientos.service';
import { InicioService } from './inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  selectedEmp:string ="";
  brokers: Brokers[] = [];
  isdImss: IDSIMSS[] = [];
  buscaMovimiento: string = "";
  registerForm: FormGroup;
  idMovimiento: string = "";
  statusMovimitos: statusMovimiento[] = [];
  constructor(private brokersService: BrokersService, private idseSE: InicioService, private formBuilder: FormBuilder,  private statuMoService: StatusmovimientosService) { }

  ngOnInit(): void {
    this.getBrokers()
    this.getStatus();
    this.initForm();
  }
  initForm(){
    this.registerForm = this.formBuilder.group({
      tipoMovimiento: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nombres: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      numSocial: ['', Validators.required],
      sd: ['', Validators.required],
      salarioInt: ['', Validators.required],
      curp: ['', Validators.required],
      rfc: ['', Validators.required],
      fechaMovimiento: ['', Validators.required],
      aportacionInfonavid: ['', Validators.required],
      creditoInfonavidVigente: ['', Validators.required],
      numeroCredito: ['', Validators.required],
      montoDescuentoCFVSMFD: ['', Validators.required],
      fechaAlta: ['', Validators.required],
      incidencia: ['', Validators.required],
      fechaBaja: ['', Validators.required],
      salarioBase: ['', Validators.required],
      claveTrabajador: ['', Validators.required],
      tipoTrabajador: ['', Validators.required],
      tipoSalario: ['', Validators.required],
      semanaJornadaReducida: ['', Validators.required],
      unidadMedicinaFamiliar: ['', Validators.required],
      guia: ['', Validators.required],
      claveUnica: ['', Validators.required],
      identificadorFormato: ['', Validators.required],
      digitoVerificadorRP: ['', Validators.required],
      digitoVerificadorNSS: ['', Validators.required],
      terminacion: ['', Validators.required],
      emaMes: ['', Validators.required],
      dias: ['', Validators.required],
      causaBaja: ['', Validators.required],
    });
  }

  getBrokers(){
    this.brokersService.getBrokers().then((resp:any)=>{
      this.brokers = resp;
    });
  }

  buscaBrokers(){
    this.idseSE.getBrokers(this.selectedEmp).then((resp:any)=>{
      this.isdImss = resp;
      console.log(resp);
    });
  }

  exportaTXTALTA(){
    let Linea:string = "";
    let Archivo: any [] = [];
    this.isdImss.forEach(e=>{
      if(e.tipoMovimiento == "ALTA" || e.tipoMovimiento == "Reingreso"){
      let RegistroPatronal:string = `${e.idEmpresa.registroPatronal}${e.digitoVerificadorRP}${e.numSocial}${e.digitoVerificadorNSS}`;
      RegistroPatronal = RegistroPatronal.padEnd(35);
      
      let Nombre = `${e.curp}${e.apellidoPaterno?.concat("$")}${e.apellidoMaterno?.concat("$")}${e.nombres}`;
      Nombre = Nombre.padEnd(68);

      let fecha = e.fechaMovimiento.split("-");
      let Salario = `${e.tipoTrabajador}${e.tipoSalario}${fecha[2]}${fecha[1]}${fecha[0]}${this.agregarCeros(e.sd?.toString())}`;
      Salario = Salario.padEnd(44);
      
      let Final = `${fecha[2]}${fecha[1]}${fecha[0]} ${e.terminacion}`;
      Final = Final.padEnd(17);
      
      Linea = `${RegistroPatronal}${Nombre}${Salario}${Final}\r\n`;
      Archivo.push(Linea);
      }
    });
    var fileName = "Altas_Sua.txt";
    //console.log(Archivo)
    this.saveTextAsFile(Archivo.toString().replace(",", ""), fileName);
  }
  exportaTXTMODIFICACION(){
    let Linea:string = "";
    let Archivo: any [] = [];
    this.isdImss.forEach(e=>{
      if(e.tipoMovimiento == "MODIFICACION"){

      let fecha = e.fechaMovimiento.split("-");
      
      let RegistroPatronal:string = `${e.idEmpresa.registroPatronal}${e.numSocial}${e.tipoSalario}${e.digitoVerificadorNSS}${fecha[2]}${fecha[1]}${fecha[0]}`;
      RegistroPatronal = RegistroPatronal.padEnd(40);
    
      
      let SALARIO = `${this.agregarCerosNueve(e.sd.toString())}`;
      
      Linea = `${RegistroPatronal}${SALARIO}\r\n`;
      Archivo.push(Linea);
      }
    });
    var fileName = "MODIFICACION_Sua.txt";
    //console.log(Archivo)
    this.saveTextAsFile(Archivo.toString().replace(",", ""), fileName);
  }
  exportaTXTBAJA(){
    let Linea:string = "";
    let Archivo: any [] = [];
    this.isdImss.forEach(e=>{
      if(e.tipoMovimiento == "BAJA"){

      let fecha = e.fechaMovimiento.split("-");
      
      let RegistroPatronal:string = `${e.idEmpresa.registroPatronal}${e.numSocial}${e.tipoSalario}${e.causaBaja}${fecha[2]}${fecha[1]}${fecha[0]}`;
      RegistroPatronal = RegistroPatronal.padEnd(40);
    
      
      let FINAL = `${e.terminacion}`;
      
      Linea = `${RegistroPatronal}${FINAL}\r\n`;
      Archivo.push(Linea);
      }
    });
    var fileName = "BAJAS_Sua.txt";
    //console.log(Archivo)
    this.saveTextAsFile(Archivo.toString().replace(",", ""), fileName);
  }
  saveTextAsFile (data:any, filename:any){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    var blob = new Blob([data], {type: 'text/plain'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      }
      else{
            var e = document.createEvent('MouseEvents'),
                a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
            e.initEvent('click', true, false);
            a.dispatchEvent(e);
          }
    }

    agregarCeros(salario:string): string {
      let result = '';
        let i = salario.length;
        do {
          i = i + 1;
          result = result + 0;
        } while (i < 7);
      return `${result}${salario}`;
    }
    agregarCerosNueve(salario:string): string {
      let result = '';
        let i = salario.length;
        do {
          i = i + 1;
          result = result + 0;
        } while (i < 9);
      return `${result}${salario}`;
    }
    getStatus(){
      this.statuMoService.getstatusM().then((resp:any)=>{
        this.statusMovimitos = resp;
      })
    }
    llenaForm(amp:IDSIMSS){
      
      this.registerForm.controls["tipoMovimiento"].setValue(amp.tipoMovimiento);
      this.registerForm.controls["apellidoPaterno"].setValue(amp.apellidoMaterno);
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
      this.idMovimiento = amp._id;
    }
    actualizarMovimiento(){
      let inputMovimiento: any = {
       _id: this.idMovimiento,
       tipoMovimiento: this.registerForm.value.tipoMovimiento,
       apellidoPaterno: this.registerForm.value.apellidoPaterno,
       apellidoMaterno: this.registerForm.value.apellidoMaterno,
       nombres: this.registerForm.value.nombres,
       nombreCompleto: this.registerForm.value.nombreCompleto,
       numSocial: this.registerForm.value.numSocial,
       sd: parseFloat(this.registerForm.value.sd),
       salarioInt: parseFloat(this.registerForm.value.salarioInt),
       curp: this.registerForm.value.curp,
       rfc: this.registerForm.value.rfc,
       fechaMovimiento: this.registerForm.value.fechaMovimiento,
       aportacionInfonavid: this.registerForm.value.aportacionInfonavid,
       creditoInfonavidVigente: this.registerForm.value.creditoInfonavidVigente,
       numeroCredito: parseFloat(this.registerForm.value.numeroCredito),
       montoDescuentoCFVSMFD: parseFloat(this.registerForm.value.montoDescuentoCFVSMFD),
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
       emaMes: parseFloat(this.registerForm.value.emaMes),
       causaBaja: this.registerForm.value.causaBaja,
       dias: parseInt(this.registerForm.value.dias)
      }
      this.idseSE.upadteMovimiento(inputMovimiento).then(resp=>{
        if(resp){
          alerta(true, "Actualizado correctamente");
        }else{
          alerta(false, "ha odurrido un error")
        }
      })
      
    }

}
