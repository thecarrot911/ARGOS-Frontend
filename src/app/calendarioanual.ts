export class Calendarioanual {
    error: boolean;
    msg: string;
    data: Data[];
}

export class Data {
    planificacion_id: number;
    mes: string;
    anio: string;
    planificacion: Planificacion[];
    actualizacion: Actualizacion[];
}


  export class Planificacion {
    dia_semana: string;
    numero_dia: string;
    empleados: Empleados[];
    comodin: string;
    itinerario: Itinerario[];
  }

  export class Itinerario{
    turno_itinerario: string;
    falta: number;
  }
  
  export class Empleados{
    nombre: string;
    turno: string;
  }
  
  export class Actualizacion{
    actualizacion_id: number;
    tipo_permiso: string;
    descripcion: string;
    empleado: string;
    fecha: string;
    planificacion_id: number;
  }
