import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { StudentsformModule } from './components/studentsform/studentsform.module';
import { SharedModule } from '../../../shared/shared.module';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    StudentsformModule,
    SharedModule,
    DirectivesModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
