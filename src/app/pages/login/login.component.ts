import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { alerta } from 'src/app/lib/alert';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private route: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void{
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
      });
  }
  login(){
    this.loginService.Login(this.registerForm.value.email, this.registerForm.value.password).then(resp=>{
      if(resp){
        this.route.navigate(["administrador/inicio"]);
      }else{
        this.loginService.LoginEmpresa(this.registerForm.value.email, this.registerForm.value.password).then(rep=>{
          if(rep){
            this.route.navigate(["brokers/inicio"]);
          }else{
            alerta(false, "El usuario o contraseña es incorrecto")
          }
        })
      }
    })
  }
}
