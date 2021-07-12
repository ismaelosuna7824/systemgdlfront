import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Brokers } from '../interfaces/brokers';

@Injectable({
  providedIn: 'root'
})
export class BrokersService {

  loading: boolean;
  posts: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }

  getBrokers(){
    return new Promise((resolve, reject)=>{
      const GET_POST = gql`
      query empresas {
        empresas {
            registroPatronal
            broker
            _id
            usuario
            status
          }
      }
    `;
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POST,
      fetchPolicy: "network-only",
    })
      .valueChanges
      .subscribe( ({ data, loading }) => {
        this.loading = loading;
        this.posts = data.empresas;
        resolve(this.posts);
      }, error=> {
        //console.log(error);
       // console.log("entro a un error");
        reject (false);
      });
    });
  }
  registerBroker(broker: Brokers){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation registerBroker($empresa:EmpresaInput){
              registerEmpresa(empresa: $empresa){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "empresa": {
            "registroPatronal": `${broker.registroPatronal}`,
            "broker": `${broker.broker}`,
            "usuario": `${broker.usuario}`,
            "contrasena": `${broker.constrasena}`,
            "status": 1
          }
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.registerEmpresa.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  updateBroker(broker: Brokers){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation updateEmpresa($empresa:EmpresaInput){
              updateEmpresa(empresa: $empresa){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "empresa": {
            "id": `${broker._id}`,
            "registroPatronal": `${broker.registroPatronal}`,
            "broker": `${broker.broker}`,
            "usuario": `${broker.usuario}`,
            "contrasena": `${broker.constrasena}`
          }
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.updateEmpresa.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  deleteBroker(broker: Brokers){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation deleteEmpresa($empresa:EmpresaInput){
              deleteEmpresa(empresa: $empresa){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "empresa": {
            "id": `${broker._id}`,
            "status": 0
          }
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.deleteEmpresa.status);
        }, err =>{
          resolve(false);
        });
    });
  }
}
