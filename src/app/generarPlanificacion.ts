import { Empleado } from './empleados';

export interface GenerarPlanificacion{
    anio: string,
    mes: string,
    empleados: Empleado[],
    itinerario: Turno_Choque[],
    comodin?: Empleado,
    turnos: Turno
}

export interface Turno{
    turno1: string,
    turno2: string,
    turno3: string
}

export interface Turno_Choque {
    dia: number,
    aviones: number,
    turno: number,
    id: number
}