import { Component, OnInit } from '@angular/core';
import { BrokersService } from '../brokers/brokers.service';
import { Brokers, IDSIMSS } from '../interfaces/brokers';
import { InicioService } from './inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  selectedEmp:string ="";
  brokers: Brokers[] = [];
  isdImss: IDSIMSS[] = [];
  constructor(private brokersService: BrokersService, private idseSE: InicioService) { }

  ngOnInit(): void {
    this.getBrokers()
  }

  getBrokers(){
    this.brokersService.getBrokers().then((resp:any)=>{
      this.brokers = resp;
    });
  }

  buscaBrokers(){
    this.idseSE.getBrokers(this.selectedEmp).then((resp:any)=>{
      this.isdImss = resp;
      console.log(resp);
    });
  }

}
