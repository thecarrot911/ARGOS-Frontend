export interface UltimaPlanificacion {
      error: boolean,
      msg: string,
      data: Planificacion,
}

interface Planificacion{
      anio: number,
      mes: string,
      id: number,
      planificacion: Dia[]
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