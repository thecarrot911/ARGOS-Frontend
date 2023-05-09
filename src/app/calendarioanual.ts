import { Planificacion } from './UltimaPlanificacion';

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

interface Mes{
    month: string;
    id: number;
    mostrar?: boolean;
}