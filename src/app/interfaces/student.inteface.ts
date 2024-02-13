export interface Student {
  id: number;
  nombre: string;
  apellido: string;
  fullName: { nombre: string; apellido: string };
  correo: string;
  telefono: string;
  curso: string;
}
