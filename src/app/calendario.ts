import { EstadisticaPlanificacion } from "./calendarioanual";
import { Planificacion } from "./UltimaPlanificacion";

export interface Calendario {
    error: boolean,
    msg: string,
    data: Data,
  }

export interface CalendarioAnual{
    error: boolean,
    msg: string,
    data: Planificacion[]
}

export interface Data {
    id?: number;
    planificacion_id: number;
    mes: string;
    anio: string;
    planificacion: Planificacion[];
    estadistica: EstadisticaPlanificacion;
    actualizacion: Actualizacion[];
    mostrar?: boolean;
}

export interface Itinerario{
  turno_itinerario: string;
  falta: number;
}

export interface Empleados{
  nombre: string,
  turno: string
}

export interface Actualizacion{
  actualizacion_id: number,
  tipo_permiso: string,
  descripcion: string,
  empleado: string,
  fecha: string,
  planificacion_id: number
}