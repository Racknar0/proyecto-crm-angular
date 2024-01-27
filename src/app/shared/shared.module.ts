import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcatNamePipe } from './concat-name.pipe';



@NgModule({
  declarations: [
    ConcatNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConcatNamePipe
  ]
})
export class SharedModule { }
