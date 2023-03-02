export class UpdateEmpleado {
      constructor(
            public actualizacion_id: number,
            public tipo_permiso: string,
            public empleado: string,
            public descripcion: string,
            public fecha: any,
            public planificacion_id: number
      ) { }
}

export class RenovarCredencial {
      constructor(
            public fecha_vencimiento: any,
            public fecha_emision: any,
            public tipo: string,
            public numero: number,
            public rut: string
      ){}
}