import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { PatronalInput } from './patronales';

@Injectable({
  providedIn: 'root'
})
export class PatronalService {
  loading: boolean;
  posts: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }

  getsPatronales(){
    return new Promise((resolve, reject)=>{
      const GET_POST = gql`
      query patronal {
        patronal{
          _id
          registroPatronal
          numeroPatronal
          nombre
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
        this.posts = data.patronal;
        resolve(this.posts);
      }, error=> {
        //console.log(error);
       // console.log("entro a un error");
        reject (false);
      });
    });
  }
  registerPatronal(patronal: PatronalInput){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation registerPatronal($patronal: PatronalInput){
            registerPatronal(patronal: $patronal){
              status
              message
            }
          }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "patronal": patronal
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.registerPatronal.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  upadtePatronal(patronal: PatronalInput){
    return new Promise((resolve, reject)=>{
      const Register = gql`
          mutation updatePatronal($patronal: PatronalInput){
            updatePatronal(patronal: $patronal){
              status
              message
            }
          }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "patronal": patronal
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.updatePatronal.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  registerPatronalBroker(patronal: any){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation registerPatronalBroker($patronal: PatronalBrokerInput){
              registerPatronalBroker(patronal: $patronal){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "patronal": patronal
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.registerPatronalBroker.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  getsPatronalID(idBroker: string){
    return new Promise((resolve, reject)=>{
      const GET_POST = gql`
      query patronal($idBroker: String) {
        patronalBroker(idBroker: $idBroker){
          _id
          idPatronal{
            _id
            registroPatronal
            nombre
    	      numeroPatronal
          }
          idBroker{
            broker
          }
        }
      }
    `;
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POST,
      variables: {
        idBroker
      },
      fetchPolicy: "network-only",
    })
      .valueChanges
      .subscribe( ({ data, loading }) => {
        this.loading = loading;
        this.posts = data.patronalBroker;
        resolve(this.posts);
      }, error=> {
        //console.log(error);
       // console.log("entro a un error");
        reject (false);
      });
    });
  }

  upadtePatronalBroker(patronal: any){
    return new Promise((resolve, reject)=>{
      const Register = gql`
          mutation updatePatronalBroker($patronal: PatronalBrokerInput){
              updatePatronalBroker(patronal: $patronal){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "patronal": patronal
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.updatePatronalBroker.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  // upadteStatus(estatus: statusMovimiento){
  //   return new Promise((resolve, reject)=>{
  //     const Register = gql`
  //          mutation upadteStatus($status:statusMovimientosInput){
  //             updateStatus(status:$status){
  //               status
  //               message
  //             }
  //           }
  //       `;
  //       this.apollo.mutate({
  //       mutation: Register,
  //       variables: {
  //         "status": {
  //           "_id": estatus._id,
  //           "nombre": `${estatus.nombre?.toUpperCase()}`,
  //           "status": estatus.status
  //         }
  //       }
  //       }).subscribe(({ data }) =>{
  //         //console.log(data);
  //         this.posts = data;
  //         //console.log(this.posts.registerProduct.product.id);
  //         resolve (this.posts.updateStatus.status);
  //       }, err =>{
  //         resolve(false);
  //       });
  //   });
  // }
}
