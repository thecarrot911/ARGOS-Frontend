export interface Tiempo {
    anio: string;
    mes: string;
    empleados: Empleado[];
    turnos_choques: Turno_Choque[];
}

interface Empleado {
    nombre: string;
  }
  
  interface Turno_Choque{
    dia: string;
    aviones: string;
    turno: string;
  }
