import { Component, OnInit } from '@angular/core';
import { Student } from '../../../interfaces/student.inteface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  showFiller = false;
  name: string = 'Camilo';

  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'fullName',
    'correo',
    'telefono',
    'nota',
    'curso',
  ];
  dataSource: Student[] = [
    {
      id: 1,
      nombre: 'Camilo Eduardo',
      apellido: 'Torres Perez',
      fullName: { nombre: 'Camilo Eduardo', apellido: 'Torres Perez' },
      correo: 'camilo@correo.com',
      telefono: '3233642951',
      curso: '10',
    },
    {
      id: 2,
      nombre: 'Juan Carlos',
      apellido: 'Alvarez Alvarez',
      fullName: { nombre: 'Juan Carlos', apellido: 'Alvarez Alvarez' },
      correo: 'juan@correo.com',
      telefono: '3233642951',
      curso: '8',
    },
    {
      id: 3,
      nombre: 'Pedro Jose',
      apellido: 'Gomez Acevedo',
      fullName: { nombre: 'Pedro Jose', apellido: 'Gomez Acevedo' },
      correo: 'pedro@correo.com',
      telefono: '3233642951',
      curso: '9',
    },
  ];

  createStudent(student: Student) {
    this.dataSource = [
      ...this.dataSource,
      { ...student, id: this.dataSource.length + 1 },
    ];
  }
}
