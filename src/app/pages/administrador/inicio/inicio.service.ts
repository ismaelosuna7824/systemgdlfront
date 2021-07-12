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
  constructor(private apollo: Apollo) { }

  getBrokers(idEmpresd:string){
    return new Promise((resolve, reject)=>{
      const GET_POST = gql`
      query empresas($idEmpresa: String) {
        movimientos(idEmpresa: $idEmpresa){
            idEmpleado
            _id
            idEmpresa{
              registroPatronal
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
}
