import { Actualizacion } from "./actualizacion"
import { EstadisticaPlanificacion } from './calendarioanual';

export interface DatoPlanificacion {
      nombre_paterno: string,
      nombre_materno: string,
      apellido_paterno: string,
      apellido_materno: string,
      rut: string,
      imagen?: any,
      mostrar?: boolean,
      planificacion: [Estadistica[]]
}

export interface Estadistica{
      anio: number,
      mes: string,
      planificacion_id: number,
      feriado: number,
      libre: number,
      turno_1: number,
      turno_2: number,
      turno_3: number
}

export interface UltimaPlanificacion {
      error: boolean,
      msg: string,
      data: Planificacion
}

export interface Planificacion{
      mes: string,
      planificacion_id: number,
      anio: number,
      planificacion: Dia[],
      estadistica?: EstadisticaPlanificacion;
      actualizacion?: ActualizacionPlani[],
      horario?: Horario,
      mostrar?: Boolean
}

export interface Horario{
      turno1: string,
      turno2: string,
      turno3: string,
      id: number
}

export interface ActualizacionPlani{
      id: number, // No se muestra
      solicitante_rut: string,
      solicitante_nombre: string,
      solicitante_apellido: string,
      reemplazo_rut: string,
      reemplazo_nombre: string,
      reemplazo_apellido: string,
      planificacion_id: number, // No se muestra
      tipo: string,
      fecha: Date,
      descripcion: string,
      fecha_inicio: Date,
      fecha_termino: Date
}

export interface Dia{
      dia_semana: string,
      dia_numero: number,
      feriado: boolean,
      empleados: Empleados[],
      comodin?: number,
      itinerario: Itinerario[]
}

export interface Itinerario{
      turno: number,
      falta: number
}

interface Empleados{
      rut: string,
      nombre: string,
      apellido: string,
      turno: number
}