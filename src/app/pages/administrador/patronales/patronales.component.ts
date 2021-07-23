import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alerta, AlertaElimina } from 'src/app/lib/alert';
import { PatronalService } from './patronal.service';
import { PatronalInput } from './patronales';

@Component({
  selector: 'app-patronales',
  templateUrl: './patronales.component.html',
  styleUrls: ['./patronales.component.css']
})
export class PatronalesComponent implements OnInit {
  registerForm: FormGroup;
  p:any;
  patronales: PatronalInput[] = [];
  idPatronal: string = "";
  constructor(private formBuilder: FormBuilder, private patronalService: PatronalService) { }

  ngOnInit(): void {
    this.initForm();
    this.getPatronales();
  }
  initForm(){
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      registroPatronal: ['', Validators.required],
      numeroPatronal: ['', Validators.required],
    });
  }

  registerPatronal(){
    const PatronalInput: PatronalInput = {
        id: this.idPatronal,
        nombre: this.registerForm.value.nombre,
        registroPatronal: this.registerForm.value.registroPatronal,
        numeroPatronal: this.registerForm.value.numeroPatronal.toString(),
        status: 1
    }
   
    if(this.idPatronal == ""){
      delete PatronalInput._id;
      this.patronalService.registerPatronal(PatronalInput).then(resp=>{
        if(resp){
          alerta(true, "Registro Patronal Agregado Correctamente");
          this.getPatronales();
        }else{
          alerta(false, "Ha ocurrido un error");
        }
      });
    }else{
      this.patronalService.upadtePatronal(PatronalInput).then(resp=>{
        if(resp){
          alerta(true, "Registro patronal actualizado correctamente");
          this.getPatronales();
          this.idPatronal = "";
          this.registerForm.reset();                                                                                                                                                                                                                                                                                                                                                                       
        }else{
          alerta(false, "Ha ocurrido un error");
        }
      });
    }
   
  }

  getPatronales(){
    this.patronalService.getsPatronales().then((resp:any)=>{
      this.patronales = resp;
    });
  }
  llenaForm(dta: PatronalInput){
    this.idPatronal = dta._id;
    this.registerForm.controls['nombre'].setValue(dta.nombre);
    this.registerForm.controls['registroPatronal'].setValue(dta.registroPatronal);
    this.registerForm.controls['numeroPatronal'].setValue(dta.numeroPatronal);
  }
  eliminarBroker(dta: PatronalInput){
    const PatronalInput: PatronalInput = {
      id: dta._id,
      nombre: dta.nombre,
      registroPatronal: dta.registroPatronal,
      numeroPatronal: dta.numeroPatronal.toString(),
      status: 0
    }

    AlertaElimina("Desea Eliminar este registro Patronal?").then(resp=>{
      if(resp){
        this.patronalService.upadtePatronal(PatronalInput).then(resp=>{
          if(resp){
            alerta(true, "Registro patronal eliminado correctamente");
            this.getPatronales();
            this.idPatronal = "";
            this.registerForm.reset();                                                                                                                                                                                                                                                                                                                                                                       
          }else{
            alerta(false, "Ha ocurrido un error");
          }
        });
      }
    });

    

  }

}
