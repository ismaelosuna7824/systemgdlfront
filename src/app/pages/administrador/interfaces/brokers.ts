export interface Brokers {
    _id?: string;
    registroPatronal?: string;
    broker?: string;
    usuario?: string;
    status?: number;
    constrasena?: string;
    patronal?: registroP;
}

export interface registroP {
    _id: string;
    nombre: string;
    numeroPatronal: string;
    registroPatronal: string;
}

export interface IDSIMSS {
    _id?: string;
    idEmpresa?: Brokers
    tipoMovimiento?: string;
	apellidoPaterno?: string;
	apellidoMaterno?: string;
	nombres?: string;
    nombreCompleto?:  string;
	numSocial?: string;
	sd?: number;
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
    emaMes?: number;
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
    dias?: number
    tipoJornada?: string; ///agregar estos campos
    umf: string; ///agregar estos campos
    subdelegacion: string ///agregar estos campos
    registroPatronal?: registroP
}

export interface statusMovimiento {
    _id?: string;
    nombre?: string;
    status?: number;
}