export class UpdateActualizacion {
        constructor(
        public actualizacion_id: number,
        public tipo_permiso: string,
        public empleado: string, 
        public descripcion: string,
        public fecha: any,    
        public planificacion_id: number
    ){}
}
