import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontDirective } from './font.directive';



@NgModule({
  declarations: [
    FontDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FontDirective
  ]
})
export class DirectivesModule { }
