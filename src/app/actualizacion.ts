export interface Respuesta{
    error: boolean,
    message: string,
    data?: Actualizacion[] | Tipo[], 
}

export interface Actualizacion{
    id?: number,
    rut: string,
    planificacion_id: number,
    descripcion: string,
    fecha_inicio: Date,
    fecha_termino: Date,
    tipo_id: number,
    reemplazo: string
}

export interface Tipo{
    id: number,
    nombre: string
}