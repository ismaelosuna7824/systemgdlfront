import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuBrokerComponent } from './side-menu-broker/side-menu-broker.component';
import { NavBarBrokerComponent } from './nav-bar-broker/nav-bar-broker.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideMenuBrokerComponent,
    NavBarBrokerComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    SideMenuBrokerComponent,
    NavBarBrokerComponent
  ]
})
export class ComponentsModule { }
