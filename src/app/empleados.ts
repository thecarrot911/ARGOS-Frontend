import { DatoPlanificacion } from "./UltimaPlanificacion"

export interface RespuestaPerfil {
    error: boolean,
    msg: string,
    data: Perfil
}

interface Perfil{
    credencial: Empleado,
    planificacion: DatoPlanificacion
}

export interface ListaEmpleados {
    error: boolean,
    msg: string,
    data: Empleado[]
}

export interface DataEmpleados{
    error:boolean,
    msg: string,
    data: Data
}

interface Data{
    credencial: Empleado[],
    planificacion: DatoPlanificacion[]
}

export interface EmpleadoData{
    error: boolean,
    msg: string,
    data?: Empleado
}

export interface Empleado {
    nombre_paterno: string,
    nombre_materno: string,
    apellido_paterno: string,
    apellido_materno: string,
    rut: string,
    imagen?: any,
    credencial?: Credencial[],
    mostrar?: Boolean,
    vence?: Boolean
}

export interface EmpleadoCredencial{
    error: boolean,
    msg: string,
    data?: Credencial[]
}

export interface Credencial{
    fecha_vencimiento: any,
    tipo: string,
    numero: number,
    rut: string,
    credencial_id?: number,
    vence?: boolean,
    dias_restantes?: number
}

export interface VencimientoCredencial{
    error: boolean,
    data: boolean
}