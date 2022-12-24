export interface PlanificacionData{
  msg: string;
  error: boolean;
  tiempo: Tiempo;
}

export interface Tiempo {
    anio: string;
    mes: string;
    empleados: Empleado[];
    itinerario: Turno_Choque[];
}

interface Empleado {
    nombre: string;
  }
  
  interface Turno_Choque{
    dia: string;
    aviones: string;
    turno: string;
  }