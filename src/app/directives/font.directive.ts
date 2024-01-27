import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFont]',
})
export class FontDirective implements OnChanges {

  @Input()
  fontSize : string = '20';

  constructor(private element: ElementRef , private renderer: Renderer2) {

    //Cambiar el font-size de todos los elementos a 20px
    this.element.nativeElement.style.fontSize = `${this.fontSize}px`;
    // Añadir la clase fw-bold a todos los elementos
    this.renderer.addClass(this.element.nativeElement, 'fw-bold');
  }

  ngOnChanges(): void {
      this.element.nativeElement.style.fontSize = `${this.fontSize}px`;
    }



}
