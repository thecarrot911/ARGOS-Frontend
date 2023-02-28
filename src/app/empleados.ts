export interface ListaEmpleados {
    error: boolean,
    msg: string,
    data: Empleado[] 
}

export interface PerfilEmpleado{
    error: boolean,
    data: Perfil
}

export interface Perfil{
    nombre_paterno: string,
    nombre_materno: string,
    apellido_paterno: string,
    apellido_materno: string,
    rut: string,
    fecha_vencimiento: string,
    fecha_emision: string,
    tipo: string,
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
    data: Credencial[]
}

export interface Credencial{
    fecha_vencimiento: string,
    fecha_emision: string,
    tipo: string,
    numero: string,
    empleado_rut: string,
    credencial_id: number
}