import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  loading: boolean;
  posts: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo, private http: HttpClient) { }

  getBrokers(idEmpresd:string){
    return new Promise((resolve, reject)=>{
      const GET_POST = gql`
      query empresas($idEmpresa: String) {
        movimientos(idEmpresa: $idEmpresa){
            idEmpleado
            _id
            idEmpresa{
              _id
              broker
            }
            tipoMovimiento
            apellidoPaterno
            apellidoMaterno
            nombres
            nombreCompleto
            numSocial
            sd
            salarioInt
            curp
            rfc
            fechaMovimiento
            aportacionInfonavid
            creditoInfonavidVigente
            numeroCredito
            montoDescuentoCFVSMFD
            idEmpleado
            fechaAlta
            incidencia
            fechaBaja
            salarioBase
            claveTrabajador
            tipoTrabajador
            tipoSalario
            semanaJornadaReducida
            unidadMedicinaFamiliar
            guia
            claveUnica
            identificadorFormato
            digitoVerificadorRP
            digitoVerificadorNSS
            terminacion
            causaBaja
            emaMes
            dias
            registroPatronal{
                _id
                numeroPatronal
                nombre
                registroPatronal
              }
            tipoJornada
            umf
            subdelegacion
            diaDesempleo
            costoDiario
            tipoAfiliacion
          }
      }
    `;
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POST,
      fetchPolicy: "network-only",
      variables:{
        idEmpresa: idEmpresd
      }
    })
      .valueChanges
      .subscribe( ({ data, loading }) => {
        this.loading = loading;
        this.posts = data.movimientos;
        resolve(this.posts);
      }, error=> {
        //console.log(error);
       // console.log("entro a un error");
        reject (false);
      });
    });
  }

  upadteMovimiento(inputMovimiento: any){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation upadeMovimiento($movimiento:MovimientoInput){
            upadteMovimiento(movimiento: $movimiento){
              status
              message
            }
          }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "movimiento": inputMovimiento
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.upadteMovimiento.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  updateStausIsd(data: any, fechaAlta:any){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation updateMovimientoArray($movimiento: arrayUpdateMovimiento){
              upadteStatusMovimiento(movimiento: $movimiento){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "movimiento": {
            "idMovimiento": data,
            "fechaAlta": `${fechaAlta}`
          }
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.upadteStatusMovimiento.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  cargarMovimientosSQL(datos:any){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation insertMovimientoSql($movimiento: [MovimientoSqlInput]){
              cargaMovimientosSQL(movimiento: $movimiento){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "movimiento": datos
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.cargaMovimientosSQL.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  cargarArchivosEMASQL(datos:any){
    return new Promise((resolve, reject)=>{
      const Register = gql`
          mutation insertMovimientoSql($movimiento: [CargaArchivoEMAInput]){
            cargaArchivosEMASQL(movimiento: $movimiento){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "movimiento": datos
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.cargaArchivosEMASQL.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  cargarArchivosEBASQL(datos:any){
    return new Promise((resolve, reject)=>{
      const Register = gql`
          mutation insertMovimientoSql($movimiento: [CargaArchivoEBAInput]){
            cargaArchivosEBASQL(movimiento: $movimiento){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "movimiento": datos
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.cargaArchivosEBASQL.status);
        }, err =>{
          resolve(false);
        });
    });
  }

  cargaMovimientos(){
    
    let mov = {
      "cliente": "ARA Consultoria",
      "broker": "SEDEVAPRO",
      "registroPatronal": "Z296582810",
      "tipoMovimiento": "ALTA",
      "nombreCompleto": "Abraham Ocegueda Sanchez",
      "nss": "4037410141",
      "salarioDiario": 248.10,
      "curp": "RUHM740920HJCZRG07",
      "fechaMovimiento": "2021-08-06",
      "tipoTrabajador": "Permanente",
      "tipoSalario": "Fijo",
      "tipoJornada": "Jornada Completa",
      "umf": "123",
      "subDelegacion": "12345",
      "fechaAlta": "1900-01-01",
      "rfc": "RUHM740920",
      "numeroCredito": "123Tamarindo",
      "incidencia": "",
      "fechaBaja": "1900-01-01",
      "diasDesempleo": 0,
      "causaBaja": ""
    }
    return this.http.post("http://kpetrom.grupoit.mx/Control37/api/CargarMovimiento/", mov);
  }

  
}
