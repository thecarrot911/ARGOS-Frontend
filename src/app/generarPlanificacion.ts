/*export interface PlanificacionData{
  msg: string;
  error: boolean;
  tiempo: Tiempo;
}

export interface Tiempo {
    anio: string;
    mes: string;
    empleados: Empleado[];
    itinerario: Turno_Choque[];
}*/

import { Empleado } from './empleados';

export interface GenerarPlanificacion{
  anio: string,
  mes: string,
  empleados: Empleado[],
  itinerario: Turno_Choque[]
}

export interface Turno_Choque {
  dia: string,
  aviones: string,
  turno: string,
  id: number
}