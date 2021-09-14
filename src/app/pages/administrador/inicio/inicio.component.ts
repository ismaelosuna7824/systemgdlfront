import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alerta } from 'src/app/lib/alert';
import { BrokersService } from '../brokers/brokers.service';
import { Brokers, IDSIMSS, statusMovimiento } from '../interfaces/brokers';
import { PatronalService } from '../patronales/patronal.service';
import { PatronalInput } from '../patronales/patronales';
import { StatusmovimientosService } from '../status-movimientos/statusmovimientos.service';
import { InicioService } from './inicio.service';
import { ArchivoEBa, ArchivoEma, MovimientosAPI } from './serviciosInterface';
import * as XLSX from 'xlsx';
type AOA = any[][];

const nav: any = window.navigator;

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
  patronales: PatronalInput[] = [];
  statusMovimitos: statusMovimiento[] = [];
  idPatronal: string = "";

  data: AOA = [[1, 2], [3, 4]];

  mustraLoading = false;
  constructor(private brokersService: BrokersService, private idseSE: InicioService, private formBuilder: FormBuilder,  private statuMoService: StatusmovimientosService, private patronalService: PatronalService) { }

  ngOnInit(): void {
    this.getBrokers()
    this.getStatus();
    this.initForm();
    this.getPatronales();
    this.getMovimientos()
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
      tipoJornada: ['', Validators.required],
      umf: ['', Validators.required],
      subdelegacion: ['', Validators.required],
      diaDesempleo: [''],
      costoDiario: ['', Validators.required],
      tipoAfiliacion: ['', Validators.required]
    });
  }

  getBrokers(){
    this.brokersService.getBrokers().then((resp:any)=>{
      this.brokers = resp;
    });
  }

  getMovimientos(){
    this.isdImss = [];
    this.idseSE.buscaMovimentosnoId().then((resp:any)=>{
      console.log(resp)
      this.isdImss = resp
    })
  }

  buscaBrokers(){
    //alert(this.selectedEmp)
    this.isdImss = [];
    const validaDuplicado = this.isdImss.filter(e => e.idEmpresa._id === this.selectedEmp);

    if(validaDuplicado.length == 0){
      this.idseSE.getBrokers(this.selectedEmp).then((resp:any)=>{

        this.isdImss.push(... resp);
         //console.log(resp);
      });
    }else{
     
    }
    
  }

  exportaTXTALTA(){
    let  today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let newDate = yyyy + '-' + mm + '-' + dd;


    let Linea:string = "";
    let Archivo: any [] = [];
    let nTotalRegistros = 0;
    let SubDelegacion = "";
    let NumeroSubDelegacion = "";

    let NuevoRegostroPatronal = this.idPatronal;
    let statusActualizar:any[] = [];

    let MovimientoApi:MovimientosAPI[] = [];
    //alert(this.idPatronal);
    this.isdImss.forEach(item=>{
      if(item.tipoMovimiento == "ALTA" || item.tipoMovimiento == "Reingreso"){

        if(item.numSocial == "" ||  item.apellidoPaterno == "" || item.nombres == "" || item.subdelegacion == "" || item.umf == ""  || item.costoDiario == "" || item.costoDiario == null  || item.tipoAfiliacion == "" || item.tipoAfiliacion == null){

        }else{
        statusActualizar.push(item._id);

        MovimientoApi.push({
          cliente: item.idEmpresa.broker,
          broker: item.registroPatronal.nombre,
          registroPatronal: item.registroPatronal.numeroPatronal,
          tipoMovimiento: item.tipoMovimiento,
          nombreCompleto: item.nombreCompleto,
          nss: item.numSocial,
          salarioDiario: item.sd.toString(),
          curp: item.curp,
          fechaMovimiento: item.fechaMovimiento,
          tipoTrabajador: item.tipoTrabajador,
          tipoSalario: item.tipoSalario,
          tipoJornada: item.tipoJornada,
          umf: item.umf,
          subDelegacion: item.subdelegacion,
          fechaAlta: `${newDate}`,
          rfc: item.rfc,
          numeroCredito: item.numeroCredito.toString(),
          incidencia: item.incidencia,
          fechaBaja: item.fechaBaja,
          diaDesempleo: item.diaDesempleo,
          causaBaja: item.causaBaja
        });
        
        let RegistroPatronal = (NuevoRegostroPatronal == ""  ? item.registroPatronal.numeroPatronal : NuevoRegostroPatronal) + item.numSocial + item.apellidoPaterno; //50
        RegistroPatronal = RegistroPatronal.padEnd(49);

        //console.log(item.registroPatronal.numeroPatronal );

        let Apellido = item.apellidoMaterno;
        Apellido = Apellido.padEnd(27);

        let Nombre = item.nombres;
        Nombre = Nombre.padEnd(27);

        let fecha = item.fechaMovimiento.split("-");
        let Salario = this.nuevoSalario(item.sd.toString())  + "000000" + item.tipoTrabajador + item.tipoSalario + item.tipoJornada + `${fecha[2]}${fecha[1]}${fecha[0]}` + item.umf ;
        Salario = Salario.padEnd(28);

        SubDelegacion = "08" + item.subdelegacion;
        NumeroSubDelegacion = item.subdelegacion;
        SubDelegacion = SubDelegacion.padEnd(18);

        let Curp = item.curp + "9";


            Linea = RegistroPatronal +
                    Apellido +
                    Nombre +
                    Salario +
                    SubDelegacion +
                    `${Curp}\r\n`;
          nTotalRegistros++;

          Archivo.push(Linea);
        }

      //alert("el tipo es " + item.tipoTrabajador)
      }
    });
    
    if(statusActualizar.length >= 1){
    let Delimitador = "*************";
    Delimitador = Delimitador.padEnd(56);

    let TotalRegistros = this.nuevoSalario(nTotalRegistros.toString());
    TotalRegistros = TotalRegistros.padEnd(77);

    SubDelegacion = NumeroSubDelegacion;
    SubDelegacion = SubDelegacion.padEnd(34);
    let LineaFinal = Delimitador + TotalRegistros + SubDelegacion + "9";
    Archivo.push(LineaFinal);


    var fileName = "Altas_Sua.txt";
    //console.log(Archivo.toString().split(',').join(''));
    this.saveTextAsFile(Archivo.toString().split(',').join(''), fileName);
      this.idseSE.updateStausIsd(statusActualizar, "1").then(resp=>{
        if(resp){
          alerta(true, "archivo generado")
        }
      })
      this.idseSE.cargarMovimientosSQL(MovimientoApi);
    }
    // console.log(MovimientoApi)
    // this.idseSE.cargarMovimientosSQL(MovimientoApi);
    
    // console.log(statusActualizar);
  }
  exportaTXTMODIFICACION(){

    let  today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let newDate = yyyy + '-' + mm + '-' + dd;

    let Linea:string = "";
    let Archivo: any [] = [];
    let SubDelegacion = "";
    let NumeroSubDelegacion = "";
    let nTotalRegistros = 0;
    let NuevoRegostroPatronal = this.idPatronal;
    let statusActualizar:any[] = [];

    let MovimientoApi:MovimientosAPI[] = [];
    this.isdImss.forEach(item=>{
      if(item.tipoMovimiento == "MODIFICACION"){
        if(item.numSocial == "" ||  item.apellidoPaterno == "" || item.nombres == "" || item.subdelegacion == "" || item.umf == "" || item.costoDiario == "" || item.costoDiario == null  || item.tipoAfiliacion == "" || item.tipoAfiliacion == null){

        }else{

        statusActualizar.push(item._id);

        MovimientoApi.push({
          cliente: item.idEmpresa.broker,
          broker: item.registroPatronal.nombre,
          registroPatronal: item.registroPatronal.numeroPatronal,
          tipoMovimiento: item.tipoMovimiento,
          nombreCompleto: item.nombreCompleto,
          nss: item.numSocial,
          salarioDiario: item.sd.toString(),
          curp: item.curp,
          fechaMovimiento: item.fechaMovimiento,
          tipoTrabajador: item.tipoTrabajador,
          tipoSalario: item.tipoSalario,
          tipoJornada: item.tipoJornada,
          umf: item.umf,
          subDelegacion: item.subdelegacion,
          fechaAlta: `${newDate}`,
          rfc: item.rfc,
          numeroCredito: item.numeroCredito.toString(),
          incidencia: item.incidencia,
          fechaBaja: item.fechaBaja,
          diaDesempleo: item.diaDesempleo,
          causaBaja: item.causaBaja
        });

        let RegistroPatronal = (NuevoRegostroPatronal == ""  ? item.registroPatronal.numeroPatronal : NuevoRegostroPatronal) + item.numSocial + item.apellidoPaterno; //50
        RegistroPatronal = RegistroPatronal.padEnd(49);

        let Apellido = item.apellidoMaterno;
        Apellido = Apellido.padEnd(27);

        let Nombre = item.nombres;
        Nombre = Nombre.padEnd(27);

        let fecha = item.fechaMovimiento.split("-");
        let Salario = this.nuevoSalario(item.sd.toString()) + "0000000" + item.tipoSalario + item.tipoJornada + `${fecha[2]}${fecha[1]}${fecha[0]}`;
        Salario = Salario.padEnd(28);

        SubDelegacion = "07" + item.subdelegacion;
        NumeroSubDelegacion = item.subdelegacion;
        SubDelegacion = SubDelegacion.padEnd(18);

        let Curp = item.curp + "9";


        Linea = RegistroPatronal +
            Apellido +
            Nombre +
            Salario +
            SubDelegacion +
            `${Curp}\r\n`;

        nTotalRegistros++;
        Archivo.push(Linea);
        
      }
        
      }
    });
    if(statusActualizar.length >= 1 ){
      var fileName = "MODIFICACION_Sua.txt";

        let Delimitador = "*************";
        Delimitador = Delimitador.padEnd(56);

        let TotalRegistros = this.nuevoSalario(nTotalRegistros.toString()); 
        TotalRegistros = TotalRegistros.padEnd(77);

        SubDelegacion = NumeroSubDelegacion;
        SubDelegacion = SubDelegacion.padEnd(34);

        let LineaFinal = Delimitador + TotalRegistros + SubDelegacion + "9";
        Archivo.push(LineaFinal);
        //console.log(Archivo)
        this.saveTextAsFile(Archivo.toString().split(',').join(''), fileName);
        this.idseSE.updateStausIsd(statusActualizar, "1").then(resp=>{
          if(resp){
            alerta(true, "archivo generado")
            this.idseSE.cargarMovimientosSQL(MovimientoApi);
          }
        })
    }
     
  }
  exportaTXTBAJA(){
    let  today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let newDate = yyyy + '-' + mm + '-' + dd;


    let Linea:string = "";
    let Archivo: any [] = [];
    let SubDelegacion = "";
    let NumeroSubDelegacion = "";
    let nTotalRegistros = 0;
    let NuevoRegostroPatronal = this.idPatronal;
    let statusActualizar:any[] = [];

    let MovimientoApi:MovimientosAPI[] = [];

    this.isdImss.forEach(item=>{
      if(item.tipoMovimiento == "BAJA"){
        if(item.numSocial == "" ||  item.apellidoPaterno == "" || item.nombres == "" || item.subdelegacion == "" || item.umf == ""  || item.costoDiario == "" || item.costoDiario == null  || item.tipoAfiliacion == "" || item.tipoAfiliacion == null){

        }else{
          statusActualizar.push(item._id);

          MovimientoApi.push({
            cliente: item.idEmpresa.broker,
            broker: item.registroPatronal.nombre,
            registroPatronal: item.registroPatronal.numeroPatronal,
            tipoMovimiento: item.tipoMovimiento,
            nombreCompleto: item.nombreCompleto,
            nss: item.numSocial,
            salarioDiario: item.sd.toString(),
            curp: item.curp,
            fechaMovimiento: item.fechaMovimiento,
            tipoTrabajador: item.tipoTrabajador,
            tipoSalario: item.tipoSalario,
            tipoJornada: item.tipoJornada,
            umf: item.umf,
            subDelegacion: item.subdelegacion,
            fechaAlta: `${newDate}`,
            rfc: item.rfc,
            numeroCredito: item.numeroCredito.toString(),
            incidencia: item.incidencia,
            fechaBaja: item.fechaBaja,
            diaDesempleo: item.diaDesempleo,
            causaBaja: item.causaBaja
          });


          let RegistroPatronal = (NuevoRegostroPatronal == ""  ? item.registroPatronal.numeroPatronal : NuevoRegostroPatronal) + item.numSocial + item.apellidoPaterno; //50
          RegistroPatronal = RegistroPatronal.padEnd(49);
  
          let Apellido = item.apellidoMaterno;
          Apellido = Apellido.padEnd(27);
  
          let Nombre = item.nombres;
          Nombre = Nombre.padEnd(42);
  
          let fecha = item.fechaMovimiento.split("-");
          let Fecha = `${fecha[2]}${fecha[1]}${fecha[0]}`;
          Fecha = Fecha.padEnd(13);
  
          SubDelegacion = "02" + item.subdelegacion;
          NumeroSubDelegacion = item.subdelegacion;
          SubDelegacion = SubDelegacion.padEnd(17);
  
          let CausaBaja = item.causaBaja;
          CausaBaja = CausaBaja.padEnd(19);
  
          let final = "9";
  
  
          Linea = RegistroPatronal +
              Apellido +
              Nombre +
              Fecha +
              SubDelegacion +
              CausaBaja +
              `${final}\r\n`;
  
          nTotalRegistros++;
        
          Archivo.push(Linea);
        }
        
      }
    });
    if(statusActualizar.length >= 1){
      var fileName = "BAJAS_Sua.txt";

      let Delimitador = "*************";
      Delimitador = Delimitador.padEnd(56);

      let TotalRegistros = this.nuevoSalario(nTotalRegistros.toString());
      TotalRegistros = TotalRegistros.padEnd(77);

      SubDelegacion = NumeroSubDelegacion;
      SubDelegacion = SubDelegacion.padEnd(34);

      let LineaFinal = Delimitador + TotalRegistros + SubDelegacion + "9";
      Archivo.push(LineaFinal);
      //console.log(Archivo)
      this.saveTextAsFile(Archivo.toString().split(',').join(''), fileName);
      this.idseSE.updateStausIsd(statusActualizar, "").then(resp=>{
        if(resp){
          alerta(true, "archivo generado")
          console.log(MovimientoApi);
        }
      })
    }
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
      if (window.navigator && nav.msSaveOrOpenBlob) {
        nav.msSaveOrOpenBlob(blob, filename);
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

    
    getStatus(){
      this.statuMoService.getstatusM().then((resp:any)=>{
        this.statusMovimitos = resp;
      })
    }
    llenaForm(amp:IDSIMSS){
      //console.log(amp)
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
      this.registerForm.controls["diaDesempleo"].setValue(amp.diaDesempleo);
      this.registerForm.controls["costoDiario"].setValue(amp.costoDiario);
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
       sd: this.registerForm.value.sd == undefined ? "0.00" : parseFloat(this.registerForm.value.sd).toFixed(2),
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
       dias: parseInt(this.registerForm.value.dias),
       tipoJornada: this.registerForm.value.tipoJornada,
       umf: parseInt(this.registerForm.value.umf).toString().padStart(3, "000"),
       subdelegacion: parseInt(this.registerForm.value.subdelegacion).toString().padStart(5,"00000"),
       diaDesempleo: parseFloat(this.registerForm.value.diaDesempleo),
       costoDiario: parseFloat(this.registerForm.value.costoDiario).toFixed(2),
       tipoAfiliacion: this.registerForm.value.tipoAfiliacion
      }
      this.idseSE.upadteMovimiento(inputMovimiento).then(resp=>{
        if(resp){
          alerta(true, "Actualizado correctamente");
          this.limpiarGrid();
        }else{
          alerta(false, "ha odurrido un error")
        }
      })
      
    }

    nuevoSalario(salario:string):string{
      if(salario.includes(".")){
          return salario.replace(".", "").padStart(6, "000000");
          //console.log(nuevos);
      }else{
          return salario.padStart(6, "000000");
      }
    }
    getPatronales(){
      this.patronalService.getsPatronales().then((resp:any)=>{
        this.patronales = resp;
      });
    }
    limpiarGrid(){
      this.isdImss = [];
    }
    validaColor(numSocial:any, apellidoPaterno:any , nombres:any, subdelegacion:any , umf:any, costoDiario:any, tipoAfiliacion: any){
      //console.log(tipoAfiliacion);
      if(numSocial == "" || apellidoPaterno == "" || nombres == "" || subdelegacion == "" || umf == "" || costoDiario == "" || costoDiario == null ||  tipoAfiliacion == "" || tipoAfiliacion == null){
        //console.log("el cosoto es ", costoDiario)
        return {'background-color':'red'}
      }else{
        return {}
      }
     
    }

    cargaEMA(ev:any){
      let ConvertOJson!:string; 
      let ArchivoEm: ArchivoEma[] = []
      let data:any[];

      const selectedFile = ev.target.files[0];
      
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event:any)=>{
        let binaryData = event.target.result;
        let workbook = XLSX.read(binaryData, {type: 'binary'});
        workbook.SheetNames.forEach(sheet=>{
          data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          // data.forEach((elem:any)=>{
          //   //console.log(elem[2])
          // })
          
        });
      }
      setTimeout(() => {
        this.mustraLoading = true;
        data.forEach((ele, ind)=>{
       // console.log(ele['Origen del Movimiento'])
         //console.log(ele[ind].NSS)
          ArchivoEm.push({
            nss: ele['NSS'],
            nombreCompleto: ele['Nombre'].toString(),
            origenMovimiento: ele['Origen del Movimiento'].toString(),
            tipoMovimiento: ele['Tipo del Movimiento'].toString(),
            fechaMovimiento: this.converdate(ele['Fecha del Movimiento']).toString(),
            dias: parseInt(ele['Días']),
            salarioDiario:  ele['Salario Diario'].toString(),
            cuotaFija: ele['Cuota Fija'].toString(),
            excedentePatronal: ele['Excedente Patronal'].toString(),
            excedenteObrero: ele['Excedente Obrero'].toString(),
            prestasionesDineroPatronal: ele['Prestaciones en Dinero Patronal'].toString(),
            prestasionesDineroObrero: ele['Prestaciones en Dinero Obrero'].toString(),
            gastoMedicosPensionadosPatronal: ele['Gastos Médicos y Pensionados Patronal'].toString(),
            gastoMedicosPensionadosObrero: ele['Gastos Médicos y Pensionados Obrero'].toString(),
            riesgoTrabajo: ele['Riesgos de Trabajo'].toString(),
            invalidezVidaPatronal: ele['Invalidez y Vida Patronal'].toString(),
            invelidezVidaObrero: ele['Invalidez y Vida Obrero'].toString(),
            guarderiasPrestacionesSociales: ele['Guarderías y Prestaciones Sociales'].toString(),
            total: ele['Total'].toString(),
            
          })
        });
        setTimeout(() => {
            // console.log(ArchivoEm)
            this.idseSE.cargarArchivosEMASQL(ArchivoEm).then(resp=>{
              if(resp){
                alerta(true, "Archivo cargado correctamente");
                this.mustraLoading = false;
                location.reload();
              }else{
                alerta(false, "ha ocurrido un error")
              }
            });
        }, 1000);
      }, 2000);
      // this.idseSE.cargaMovimientos().subscribe(resp=>{
      //   console.log(resp);
      // });
    }
    cargaEBA(ev:any){
      let ConvertOJson!:string; 
      let ArchivoEm: ArchivoEBa[] = []
      let data:any[];

      const selectedFile = ev.target.files[0];
      
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event:any)=>{
        let binaryData = event.target.result;
        let workbook = XLSX.read(binaryData, {type: 'binary'});
        workbook.SheetNames.forEach(sheet=>{
          data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          // data.forEach((elem:any)=>{
          //   //console.log(elem[2])
          // })
          
        });
      }
      setTimeout(() => {
        this.mustraLoading = true;
        data.forEach((ele, ind)=>{
       // console.log(ele['Origen del Movimiento'])
         //console.log(ele[ind].NSS)
          ArchivoEm.push({
            nss: ele['NSS'],
            nombreCompleto: ele['Nombre'].toString(),
            origenMovimiento: ele['Origen del Movimiento'].toString(),
            tipoMovimiento: ele['Tipo del Movimiento'].toString(),
            fechaMovimiento: this.converdate(ele['Fecha del Movimiento']).toString(),
            dias: parseInt(ele['Días']),
            salarioDiario:  ele['Salario Diario'].toString(),
            retiro: ele['Retiro'].toString(),
            cesantiaEdadAvanzadaPatronal: ele['Cesantía en Edad Avanzada y Vejez Patronal'].toString(),
            censatiaEdadAvanzadaObrero: ele['Cesantía en Edad Avanzada y Vejez Obrero'].toString(),
            subtotalRCV: ele['Subtotal RCV'].toString(),
            aportacionPatronal: ele['Aportación Patronal'].toString(),
            tipoDescuento: ele['Tipo de Descuento'].toString(),
            valorDescuento: ele['Valor de Descuento'].toString(),
            numeroCredito: ele['Número de Crédito'].toString(),
            amortizacion: ele['Amortización'].toString(),
            subtotalInfonavit: ele['Subtotal Infonavit'].toString(), 
            total: ele['Total'].toString(),
          })
        });
        setTimeout(() => {
           //console.log(ArchivoEm)
            this.idseSE.cargarArchivosEBASQL(ArchivoEm).then(resp=>{
              if(resp){
                this.mustraLoading = false;
                alerta(true, "Archivo cargado correctamente");
                location.reload();
              }else{
                alerta(false, "ha ocurrido un error")
              }
            });
        }, 1000);
      }, 2000);
      // this.idseSE.cargaMovimientos().subscribe(resp=>{
      //   console.log(resp);
      // });
    }
    converdate(date: string):string{
      console.log(date);
        if(date == "-"){
          return "01/01/0000";
        }else{
          let  today = new Date(date);
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          let newDate =  mm + '/' + dd + '/' + yyyy;
          return `${newDate}`;
        }
    }
    pruebaHttp(){
      this.idseSE.cargaMovimientos().subscribe(resp=>{
        console.log(resp);
      })
    }
}
