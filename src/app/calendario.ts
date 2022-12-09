export interface Calendario {
    error: boolean,
    msg: string,
    data: Data,
  }

interface Data {
    planificacion_id: number;
    mes: string;
    anio: string;
    planificacion: Planificacion[];
    actualizacion: Actualizacion[];
}
interface Planificacion {
  dia_semana: string;
  numero_dia: string;
  empleados: Empleados[];
  comodin: string;
  itinerario: Itinerario[];
}
export interface Itinerario{
  turno_itinerario: string;
  falta: number;
}

interface Empleados{
  nombre: string,
  turno: string
}

interface Actualizacion{
  actualizacion_id: number,
  tipo_permiso: string,
  descripcion: string,
  empleado: string,
  fecha: string,
  planificacion_id: number
}