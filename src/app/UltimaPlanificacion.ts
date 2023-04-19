import { Actualizacion } from "./actualizacion"

export interface DatoPlanificacion {
      nombre_paterno: string,
      nombre_materno: string,
      apellido_paterno: string,
      apellido_materno: string,
      rut: string,
      imagen?: any,
      planificacion: [Estadistica[]]
}

interface Estadistica{
      anio: number,
      mes: string,
      planificacion_id: number,
      feriado: number,
      libre: number,
      turno_1: number,
      turno_2: number,
      tunro_3: number
}

export interface UltimaPlanificacion {
      error: boolean,
      msg: string,
      data: Planificacion
}

export interface Planificacion{
      anio: number,
      mes: string,
      id: number,
      planificacion: Dia[],
      actualizacion: Actualizacion[],
      mostrar?: Boolean
}

interface Dia{
      dia_semana: string,
      dia_numero: number,
      feriado: boolean,
      empleados: Empleados[]
}

interface Empleados{
      rut: string,
      nombre: string,
      apellido: string,
      turno: number
}