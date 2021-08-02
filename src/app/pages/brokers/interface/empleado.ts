export interface Empleado  {
    _id?: string;
    nombres?: string;
    apellidos?: string;
    curp?: string;
    rfc?: string;
    numSeguro?: string;
    status?: number; 
}

export interface IDSMO {
    idEmpleado?: string;
    idEmpresa?: string;
    tipoMovimiento?: string;
	apellidoPaterno?: string;
	apellidoMaterno?: string;
	nombres?: string;
    nombreCompleto?:  string;
	numSocial?: string;
	sd?: string;
    salarioInt?: number;
	curp?: string;
    rfc?: string;
    fechaMovimiento?: string;
	aportacionInfonavid?: string;
	creditoInfonavidVigente?: string;
	numeroCredito?: number;
	montoDescuentoCFVSMFD?: number;
    fechaAlta?: string;
    incidencia?: string;
    fechaBaja?: string;

    salarioBase?: number;
    claveTrabajador?: string
    tipoTrabajador?: string 
    tipoSalario?: string 
    semanaJornadaReducida?: string 
    unidadMedicinaFamiliar?: string
    guia?: string 
    claveUnica?: string 
    identificadorFormato?: string
    digitoVerificadorRP?: string
    digitoVerificadorNSS?: string
    terminacion?: string
    causaBaja?: string 
    tipoJornada?: string
    umf?: string
    subdelegacion?: string
    status: number
    diaDesempleo: number
}