import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

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
  // registerEmpleado(empleado: Empleado){
  //   return new Promise((resolve, reject)=>{
  //     const Register = gql`
  //          mutation registerEmpleado($empleado: EmpleadoInput){
  //             registerEmpleado(empleado: $empleado){
  //               status
  //               message
  //             }
  //           }
  //       `;
  //       this.apollo.mutate({
  //       mutation: Register,
  //       variables: {
  //         "empleado": {
  //           "idEmpresa": `${empleado._id}`,
  //           "nombres": `${empleado.nombres}`,
  //           "apellidos": `${empleado.apellidos}`,
  //           "curp": `${empleado.curp}`,
  //           "rfc": `${empleado.rfc}`,
  //           "numSeguro": `${empleado.numSeguro}`,
  //           "status": 1
  //         }
  //       }
  //       }).subscribe(({ data }) =>{
  //         //console.log(data);
  //         this.posts = data;
  //         //console.log(this.posts.registerProduct.product.id);
  //         resolve (this.posts.registerEmpleado.status);
  //       }, err =>{
  //         resolve(false);
  //       });
  //   });
  // }
  // updateEmpleado(empleado: Empleado){
  //   return new Promise((resolve, reject)=>{
  //     const Register = gql`
  //          mutation updateEmpleado($empleado: EmpleadoInput){
  //             updateEmpleado(empleado: $empleado){
  //               status
  //               message
  //             }
  //           }
  //       `;
  //       this.apollo.mutate({
  //       mutation: Register,
  //       variables: {
  //         "empleado": {
  //           "id": `${empleado._id}`,
  //           "nombres": `${empleado.nombres}`,
  //           "apellidos": `${empleado.apellidos}`,
  //           "curp": `${empleado.curp}`,
  //           "rfc": `${empleado.rfc}`,
  //           "numSeguro": `${empleado.numSeguro}`,
  //           "status": empleado.status
  //         }
  //       }
  //       }).subscribe(({ data }) =>{
  //         //console.log(data);
  //         this.posts = data;
  //         //console.log(this.posts.registerProduct.product.id);
  //         resolve (this.posts.updateEmpleado.status);
  //       }, err =>{
  //         resolve(false);
  //       });
  //   });
  // }
}
