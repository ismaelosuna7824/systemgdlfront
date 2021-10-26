import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inicio'
})
export class InicioPipe implements PipeTransform {

  transform(value: any, ...arg: any): any {
    const resultAlumnos:any[] = [];
    console.log(arg)
    if(arg.toString() == ""){
      return value
    }else{
      console.log("entra asqui")
      for(const dato in value){
    
        //console.log(value[dato].tipoMovimiento)
         if(value[dato].tipoMovimiento.toString().indexOf(arg.toString())>-1 ){
           resultAlumnos.push(value[dato]);
         };
       };
    }
    return resultAlumnos;
  }

}
