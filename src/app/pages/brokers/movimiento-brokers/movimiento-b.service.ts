import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoBService {
  loading: boolean;
  posts: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }
  getBrokers(fecha:string){
    return new Promise((resolve, reject)=>{
      const GET_POST = gql`
      query empresas($fecha: String) {
        movimientosFecha(fecha: $fecha){
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
          }
      }
    `;
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POST,
      fetchPolicy: "network-only",
      variables:{
        fecha: fecha
      }
    })
      .valueChanges
      .subscribe( ({ data, loading }) => {
        this.loading = loading;
        this.posts = data.movimientosFecha;
        console.log(fecha)
        resolve(this.posts);
      }, error=> {
        //console.log(error);
       // console.log("entro a un error");
        reject (false);
      });
    });
  }
}