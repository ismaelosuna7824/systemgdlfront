import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { alerta, AlertaElimina } from 'src/app/lib/alert';
import Swal from 'sweetalert2';
import { Empleado } from '../interface/empleado';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  registerForm: FormGroup;
  idBroker: string;
  empleados: Empleado[] =[];
  p:number = 1;
  buscaEmp:string="";
  idEmpleado: string = "";
  constructor( 
    private formBuilder: FormBuilder, 
    private route: Router,
    private empleadoService: DashboardService) { }

  async ngOnInit() {
    this.initForm();
    this.idBroker = await localStorage.getItem('broker') || "";
    this.getEmpleados(this.idBroker)
  }

  initForm(): void{
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      curp: ['', Validators.required],
      rfc: ['', Validators.required],
      numeroSocial: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      status: [1]
      });
  }
  registerEmpleado(){
    let inputEmpleado:Empleado = {
      _id: this.idEmpleado == ""  ? this.idBroker : this.idEmpleado,
      nombres: this.registerForm.value.nombre,
      apellidos: this.registerForm.value.apellido,
      curp: this.registerForm.value.curp,
      rfc: this.registerForm.value.rfc,
      numSeguro: this.registerForm.value.numeroSocial,
      status: this.registerForm.value.status
    }
    
    if(this.idEmpleado == ""){
      this.empleadoService.registerEmpleado(inputEmpleado).then(resp=>{
        if(resp){
          alerta(true, "Empleado Registrado Correctamente");
          this.registerForm.reset();
          this.getEmpleados(this.idBroker);
        }else{
          alerta(false, "Ha ocurrido un error")
        }
      })
    }else{
      this.empleadoService.updateEmpleado(inputEmpleado).then(resp=>{
        if(resp){
          alerta(true, "Empleado Actualizado Correctamente");
          this.registerForm.reset();
          this.getEmpleados(this.idBroker);
          this.idEmpleado = "";
        }else{
          alerta(false, "Ha ocurrido un error")
        }
      })
    }
  }
  getEmpleados(id:any){
    this.empleadoService.getEmpleados(id).then((resp:any)=>{
      this.empleados = resp;
    }); 
  }
  llenaForm(emp: Empleado){
    this.registerForm.controls["nombre"].setValue(emp.nombres);
    this.registerForm.controls["apellido"].setValue(emp.apellidos);
    this.registerForm.controls["curp"].setValue(emp.curp);
    this.registerForm.controls["rfc"].setValue(emp.rfc);
    this.registerForm.controls["numeroSocial"].setValue(emp.numSeguro);
    this.registerForm.controls["status"].setValue(emp.status == undefined ? 1 : emp.status);
    this.idEmpleado = emp._id || "";
  }
  eliminarEnpleado(emp:Empleado){
    let inputEmpleado:Empleado = {
      _id: emp._id,
      nombres: emp.nombres,
      apellidos: emp.apellidos,
      curp: emp.curp,
      rfc: emp.rfc,
      numSeguro: emp.numSeguro,
      status: 0
    }
    AlertaElimina("Desea Eliminar este Empleado?").then(resp=>{
      if(resp){
        this.empleadoService.updateEmpleado(inputEmpleado).then(resp=>{
          if(resp){
            alerta(true, "Empleado Eliminado Correctamente");
            this.registerForm.reset();
            this.getEmpleados(this.idBroker);
            this.idEmpleado = "";
          }else{
            alerta(false, "Ha ocurrido un error")
          }
        })
      }
    })
    
  }
}
