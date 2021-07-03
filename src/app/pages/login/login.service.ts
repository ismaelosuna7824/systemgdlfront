import { Injectable } from '@angular/core';
import { gql } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loading: boolean;
  posts: any;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }

  Login(usuario: string, password:string){
    return new Promise((resolve, reject)=>{
      const GET_POST = gql`
      query LoginUser($email : String!, $pass: String!) {
        login(email: $email, password: $pass){
            message
            status
            token
        }
      }
    `;
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POST,
      variables: {
        email: usuario,
        pass: password
      }
    })
      .valueChanges
      .subscribe( ({ data, loading }) => {
        this.loading = loading;
        this.posts = data.posts;
        //console.log(`la data es ${data.login}`)
        // localStorage.setItem('id', data.login.message);
        if(data.login.status){
          localStorage.setItem('token', data.login.token);
          resolve(true);
           
        }else{
          resolve(false);
        }
      }, error=> {
        //console.log(error);
       // console.log("entro a un error");
        reject (false);
      });
    });
  }
  LoginEmpresa(usuario: string, password:string){
    return new Promise((resolve, reject)=>{
      const GET_POST = gql`
      query LoginUser($email : String!, $pass: String!) {
        loginEmpresa(email: $email, password: $pass){
            message
            status
            token
        }
      }
    `;
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POST,
      variables: {
        email: usuario,
        pass: password
      }
    })
      .valueChanges
      .subscribe( ({ data, loading }) => {
        this.loading = loading;
        this.posts = data.posts;
        //console.log(`la data es ${data.login}`)
        // localStorage.setItem('id', data.login.message);
        if(data.loginEmpresa.status){
          localStorage.setItem('token', data.loginEmpresa.token);
          localStorage.setItem('broker', data.loginEmpresa.message);
          resolve(true);
           
        }else{
          resolve(false);
        }
      }, error=> {
        //console.log(error);
       // console.log("entro a un error");
        reject (false);
      });
    });
  }
}
