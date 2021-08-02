import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { IDSMO } from '../interface/empleado';

@Injectable({
  providedIn: 'root'
})
export class IdsService {

  loading: boolean;
  posts: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }


  registerIds(empleado: IDSMO[]){
    console.log(empleado)
    return new Promise((resolve, reject)=>{
      const Register = gql`
           mutation registerMovimiento($movimiento:MovimientosInputList){
              registerMovimiento(movimiento: $movimiento){
                status
                message
              }
            }
        `;
        this.apollo.mutate({
        mutation: Register,
        variables: {
          "movimiento": {
            "movimientos": empleado
          }
        }
        }).subscribe(({ data }) =>{
          //console.log(data);
          this.posts = data;
          //console.log(this.posts.registerProduct.product.id);
          resolve (this.posts.registerMovimiento.status);
        }, err =>{
          resolve(false);
        });
    });
  }
  
}
