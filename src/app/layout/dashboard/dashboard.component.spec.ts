import { TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Mock, MockProvider } from 'ng-mocks';
import { AuthService } from "../../core/services/auth.service";
import { SharedModule } from "../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('Testeo de Dashboard Component', () => {

  let component: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [MockProvider(AuthService)],
      imports: [SharedModule, BrowserAnimationsModule, RouterTestingModule]
    });
  });

  it('Debe crear el componente', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debe llamar al metodo logout', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    const authService = TestBed.inject(AuthService);
    const spy = spyOn(authService, 'logout').and.callThrough();
    component.logout();
    expect(spy).toHaveBeenCalled();
  });

});
