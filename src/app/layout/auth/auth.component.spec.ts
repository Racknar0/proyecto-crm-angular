import { TestBed } from "@angular/core/testing";
import { AuthComponent } from "./auth.component";
import { MockProvider } from "ng-mocks";
import { AuthService } from "../../core/services/auth.service";
import { SharedModule } from "../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

describe('Testeo de Auth Component', () => {

  let component: AuthComponent;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [MockProvider(AuthService)],
      imports: [SharedModule, BrowserAnimationsModule, RouterTestingModule]
    });
  });

  it('Debe crear el componente', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debe existir el metodo login', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    expect(component.login).toBeTruthy();
  });

  it('Debe existir el formulario loginForm', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    expect(component.loginForm).toBeTruthy();
  });

  it('el login form debe los controles llamados email, password ', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('cuando se llame el metodo login los controles deben marcarse markAllAsTouched ', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.login();
    expect(component.loginForm.controls['email'].touched).toBeTruthy();
    expect(component.loginForm.controls['password'].touched).toBeTruthy();
  });

  it('cuando se llame el metodo login y el formulario es valido se debe llamar al metodo login del AuthService', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    const authService = TestBed.inject(AuthService);
    const spy = spyOn(authService, 'login').and.callThrough();
    component.loginForm.controls['email'].setValue('email@email.com');
    component.loginForm.controls['password'].setValue('123456');
    component.login();
    expect(spy).toHaveBeenCalled();
  });

});
