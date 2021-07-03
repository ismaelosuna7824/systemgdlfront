import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu-broker',
  templateUrl: './side-menu-broker.component.html',
  styleUrls: ['./side-menu-broker.component.css']
})
export class SideMenuBrokerComponent implements OnInit {
  @Input() view:number;
  constructor() { }

  ngOnInit(): void {
  }

}
