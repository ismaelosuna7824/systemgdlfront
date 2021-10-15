export interface MovimientosAPI {
    cliente: string;
    broker: string,
    registroPatronal: string,
    tipoMovimiento: string,
    nombreCompleto: string,
    nss: string,
    salarioDiario: string,
    curp: string,
    fechaMovimiento: string,
    tipoTrabajador: string,
    tipoSalario: string,
    tipoJornada: string,
    umf: string,
    subDelegacion: string,
    fechaAlta: string,
    rfc: string,
    numeroCredito: string,
    incidencia: string,
    fechaBaja: string,
    diaDesempleo: number,
    causaBaja: string
  }

  export interface ArchivoEma {
    nss: string,
    nombreCompleto: string,
    origenMovimiento: string,
    tipoMovimiento: string,
    fechaMovimiento: string,
    dias: number,
    salarioDiario:  string,
    cuotaFija: string,
    excedentePatronal: string,
    excedenteObrero: string,
    prestasionesDineroPatronal: string,
    prestasionesDineroObrero: string,
    gastoMedicosPensionadosPatronal: string,
    gastoMedicosPensionadosObrero: string,
    riesgoTrabajo: string,
    invalidezVidaPatronal: string,
    invelidezVidaObrero: string,
    guarderiasPrestacionesSociales: string
    total: string 
    fecha: string
}


export interface ArchivoEBa {
  nss: string,
  nombreCompleto: string,
  origenMovimiento: string,
  tipoMovimiento: string,
  fechaMovimiento: string,
  dias: number,
  salarioDiario: string,
  retiro: string,
  cesantiaEdadAvanzadaPatronal: string,
  censatiaEdadAvanzadaObrero: string,
  subtotalRCV: string,
  aportacionPatronal: string,
  tipoDescuento: string,
  valorDescuento: string,
  numeroCredito: string,
  amortizacion: string,
  subtotalInfonavit: string,
  total: string    
  fecha:string
}