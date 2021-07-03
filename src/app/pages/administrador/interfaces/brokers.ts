export interface Brokers {
    _id: string;
    registroPatronal: string;
    broker: string;
    usuario: string;
    status: number;
}

export interface IDSIMSS {
    _id?: string;
    idEmpresa?: Brokers
    tipoMovimiento?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    nombres?: string;
    nombreCompleto?: string;
    nuSocial?: string;
    sd?: string;
    salarioInt?: string;
    curp?: string;
    rfc?: string;
    fechaMovimiento?: string;
    aportacionInfonavid?: string;
    creditoInfonavidVigente?: string;
    numeroCredito?: string;
    montoDescuentoCFVSMFD?: string;
}