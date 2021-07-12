import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alerta, AlertaElimina } from 'src/app/lib/alert';
import { Brokers } from '../interfaces/brokers';
import { BrokersService } from './brokers.service';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {
  registerForm: FormGroup;
  idBroker:string = "";
  brokers: Brokers[] = [];
  p:any;
  buscaBroker:string = "";
  constructor(private formBuilder: FormBuilder, private brokerService: BrokersService) { }

  ngOnInit(): void {
    this.initForm();
    this.getBrokets();
  }

  initForm(){
    this.registerForm = this.formBuilder.group({
      registroPatronal: ['', Validators.required],
      broker: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }
  registerBroker(){
    let brokerInput:Brokers = {
      registroPatronal: this.registerForm.value.registroPatronal,
      broker: this.registerForm.value.broker,
      usuario: this.registerForm.value.usuario,
      constrasena: this.registerForm.value.contrasena,
      _id: this.idBroker
      
    }
    if(this.idBroker == ""){
        this.brokerService.registerBroker(brokerInput).then(resp=>{
          if(resp){
            alerta(true, "Broker Agregago correctamente");
            this.registerForm.reset();
            this.getBrokets();
          }else{
            alerta(false, "Ha ocurrido un error");
          }
        })
    }else{
      this.brokerService.updateBroker(brokerInput).then(resp=>{
        if(resp){
          alerta(true, "Se ha actualizado el broker correctamente");
          this.registerForm.reset();
          this.idBroker = "";
          this.getBrokets();
        }else{
          alerta(false, "Ha ocurrido un error");
        }
      })
    }
  }

  getBrokets(){
    this.brokerService.getBrokers().then((resp:any)=>{
      this.brokers = resp;
    });
  }
  llenaForm(broker: Brokers){
    this.idBroker = broker._id || "";
    this.registerForm.controls['registroPatronal'].setValue(broker.registroPatronal);
    this.registerForm.controls['broker'].setValue(broker.broker);
    this.registerForm.controls['usuario'].setValue(broker.usuario);
  }
  eliminarBroker(broker: Brokers){
      let inputBroker: Brokers = {
        _id: broker._id,
        status: 0
      }
      AlertaElimina("Desea eliminar este Broker?").then(resp=>{
        if(resp){
          this.brokerService.deleteBroker(inputBroker).then(resp=>{
            if(resp){
              alerta(true, "Broker Eliminado correctamnete");
              this.getBrokets();
            }else{
              alerta(false, "Ha ocurrido un error");
            }
          });
        }
      })
  }

}
