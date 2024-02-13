import { Profesor } from "./profesor.interface";

export interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: number;
  profesor: Profesor;
  fechaInicio: Date;
  fechaFin: Date;
}
