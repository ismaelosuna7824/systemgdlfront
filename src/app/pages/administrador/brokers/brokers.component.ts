import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alerta, AlertaElimina } from 'src/app/lib/alert';
import { Brokers } from '../interfaces/brokers';
import { PatronalService } from '../patronales/patronal.service';
import { PatronalInput } from '../patronales/patronales';
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
  patronales: PatronalInput[] = [];
  idPatronal: string = "";
  constructor(private formBuilder: FormBuilder, private brokerService: BrokersService, private patronalService: PatronalService) { }

  ngOnInit(): void {
    this.initForm();
    this.getBrokets();
    this.getPatronales();
    // const ab = this.getPatronalId('60f9e79daf0edd44cc8d6745');
     //this.getPatronalId('60f9e79daf0edd44cc8d6745')
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
      registroPatronal: "",
      broker: this.registerForm.value.broker,
      usuario: this.registerForm.value.usuario,
      constrasena: this.registerForm.value.contrasena,
      _id: this.idBroker
      
    }
    if(this.idBroker == ""){
        if(this.registerForm.value.broker == "" || this.registerForm.value.usuario == "" || this.registerForm.value.contrasena == "" || this.idPatronal == "")
        {
          alerta(false, "faltan campos por llenar")
        }
        else{
          this.brokerService.registerBroker(brokerInput).then((resp:any)=>{
            if(resp.status){
              let patronalBrokerInput = {
                  idBroker:  resp.idBroker,
                  idPatronal: this.idPatronal,
                  status: 1
              }
              this.patronalService.registerPatronalBroker(patronalBrokerInput).then(resp=>{
                  if(resp){
                    alerta(true, "Broker Agregago correctamente");
                    this.registerForm.reset();
                    this.getBrokets();
                  }
              })
             
            }else{
              alerta(false, "Ha ocurrido un error");
            }
          })
        }
    }else{
      this.brokerService.updateBroker(brokerInput).then(resp=>{
        if(resp){
          
          
          this.patronalService.getsPatronalID(this.idBroker).then((resp:any)=>{
            let inputP = {
              id: resp._id,
              idBroker: "si",
              idPatronal: this.idPatronal
            }
            this.patronalService.upadtePatronalBroker(inputP).then(resp=>{
              alerta(true, "Se ha actualizado el broker correctamente");
              this.registerForm.reset();
              this.getBrokets();
              this.idBroker = "";
              this.idPatronal = "";
            });
            //console.log(resp._id);
          })
         
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
  llenaForm(broker: any){
    this.idBroker = broker._id || "";
    this.idPatronal = broker.registroPatronal._id || "";
    this.registerForm.controls['registroPatronal'].setValue(broker.registroPatronal);
    this.registerForm.controls['broker'].setValue(broker.broker);
    this.registerForm.controls['usuario'].setValue(broker.usuario);
    //console.log(broker);
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
  getPatronales(){
    this.patronalService.getsPatronales().then((resp:any)=>{
      this.patronales = resp;
    });
  }
  getPatronalId(id:string): string{
    // this.patronalService.getsPatronalID(id).then(resp=>{
    //   console.log(resp);
    // })
    return "hola;";
    
  }
}
