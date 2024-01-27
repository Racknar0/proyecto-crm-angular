import { Pipe, PipeTransform } from '@angular/core';

export interface UserPipe {
  nombre: string;
  apellido: string;
}

@Pipe({
  name: 'concatName'
})
export class ConcatNamePipe implements PipeTransform {
  transform(value: UserPipe, ...args: unknown[]): unknown {
    if (args.includes('mayus')) {
      return `${value.nombre.toUpperCase()} ${value.apellido.toUpperCase()}`;
    } else if (args.includes('minus')) {
      return `${value.nombre.toLowerCase()} ${value.apellido.toLowerCase()}`;
    }
    return `${value.nombre} ${value.apellido}`;
  }
}
