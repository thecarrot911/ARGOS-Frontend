export interface ListaEmpleados {
    error: boolean,
    msg: string,
    data: Empleado[]
}

export interface EmpleadoData{
    error: boolean,
    msg: string,
    data: Empleado
}

export interface Empleado {
    nombre_paterno: string,
    nombre_materno: string,
    apellido_paterno: string,
    apellido_materno: string,
    rut: string,
    credencial?: Credencial[]
}

export interface EmpleadoCredencial{
    error: boolean,
    msg: string,
    data?: Credencial[]
}

export interface Credencial{
    fecha_vencimiento: any,
    fecha_emision: any,
    tipo: string,
    numero: number,
    empleado_rut: string,
    credencial_id?: number
}