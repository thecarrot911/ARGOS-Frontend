import { Planificacion } from './UltimaPlanificacion';

export class PlanificacionAnual {
    error: boolean;
    msg: string;
    data: Planificacion[];
}

export interface EstadisticaPlanificacion{
    month: string,
    empleados: Informacion[]
}

export interface Informacion{
    rut: string,
    nombre_paterno: string,
    apellido_paterno: string,
    imagen: string,
    feriado: number,
    libre: number,
    turno1: number,
    turno2: number,
    turno3: number
}

export interface PlanificacionAnios{
    error: boolean,
    msg: string,
    data: Anios[];
}

export interface Anios{
    year: number,
    meses: Months[],
    mostrar?: boolean
}

export interface Months{
    mes: string,
    id: number
}