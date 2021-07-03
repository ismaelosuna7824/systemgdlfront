import Swal from "sweetalert2";

export const alerta = (icono:any, texto:any) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      if(icono){
        return Toast.fire({
            icon: "success",
            title: `${texto}`
          })
      }else{
        return Toast.fire({
            icon: "error",
            title: `${texto}`
          })
      }
}

export const AlertaElimina = (texto: any) => {
  return new Promise((resolve:any, reject:any) => {
      Swal.fire({
        title: `${texto}`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Continuar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          resolve(true)
        } else if (result.isDenied) {
          resolve(false)
        }
      });
      
  });
}