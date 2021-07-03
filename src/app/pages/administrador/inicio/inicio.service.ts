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
            nuSocial
            sd
            salarioInt
            curp
            rfc
            fechaMovimiento
            aportacionInfonavid
            creditoInfonavidVigente
            numeroCredito
            montoDescuentoCFVSMFD
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
}
