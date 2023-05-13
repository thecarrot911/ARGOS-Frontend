import { Empleado } from './empleados';

export interface GenerarPlanificacion{
    anio: string,
    mes: string,
    empleados: Empleado[],
    itinerario: Turno_Choque[],
    comodin?: Empleado
}

export interface Turno_Choque {
    dia: number,
    aviones: number,
    turno: number,
    id: number
}