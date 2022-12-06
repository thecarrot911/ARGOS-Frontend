export class Actualizacion {
    constructor(
        public tipo_permiso: string,
        public empleado: string, 
        public descripcion: string,
        public fecha: any,    
        public planificacion_id: number
    ){}
}
