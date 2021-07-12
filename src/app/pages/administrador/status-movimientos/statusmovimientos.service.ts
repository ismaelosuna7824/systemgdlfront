import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { statusMovimiento } from '../interfaces/brokers';

@Injectable({
  providedIn: 'root'
})
export class StatusmovimientosService {
  loading: boolean;
  posts: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }

  getstatusM(){
    return new Promise((resolve, reject)=>{
      const GET_POST = gql`
      query statusMovimiento {
        statusMovimiento{
            _id
            nombre
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
        this.posts = data.statusMovimiento;
        resolve(this.posts);
      }, error=> {
        //console.log(error);
       // console.log("entro a un error");
        reject (false);
      });
    });
  }
  registerStatus(estatus: statusMovimiento){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation registerStatusMovimientos($status: statusMovimientosInput){
            registerStatus(status: $status){
              status
              message
            }
          }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "status": {
            "nombre": `${estatus.nombre?.toUpperCase()}`,
            "status": 1
          }
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.registerStatus.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  upadteStatus(estatus: statusMovimiento){
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation upadteStatus($status:statusMovimientosInput){
              updateStatus(status:$status){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "status": {
            "_id": estatus._id,
            "nombre": `${estatus.nombre?.toUpperCase()}`,
            "status": estatus.status
          }
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.updateStatus.status);
        }, err =>{
          resolve(false);
        });
    });
  }
}
