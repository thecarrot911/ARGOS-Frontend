import { Planificacion, Estadistica } from './UltimaPlanificacion';

export class PlanificacionAnual {
    error: boolean;
    msg: string;
    data: Planificacion[];
}

export interface PlanificacionesAnuales {
    error: boolean;
    msg: string;
    data: [PlanificacionMensual];
}

export interface PlanificacionMensual {
    year: number;
    months: Mes[];
    mostrar?: boolean;
}

export interface Mes{
    month: string;
    id: number;
    estadistica: Informacion[];
}

export interface Informacion{
    month: string,
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
