export interface Student {
  id: number;
  nombre: string;
  fullName?: { nombre: string; apellido: string };
  apellido: string;
  correo: string;
  telefono: string;
  nota: string;
  curso: string;
}
