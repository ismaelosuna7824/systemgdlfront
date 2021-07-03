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
	nuSocial?: string;
	sd?: number;
    salarioInt?: number;
	curp?: string;
    rfc?: string;
    fechaMovimiento?: string;
	aportacionInfonavid?: string;
	creditoInfonavidVigente?: string;
	numeroCredito?: number;
	montoDescuentoCFVSMFD?: number;
}