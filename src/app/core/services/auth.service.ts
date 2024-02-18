import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { simpleAlert, simpleAlertWithTimer } from '../../utils/alerts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  async setTokens(email: string , user: any) {
    // Setear el token en el usuario con put
    const token = Math.random().toString(36).substring(2);
    try {
      const userUpdated = await this.http.put('http://localhost:3000/users/' + user.id, { ...user, token }).toPromise();
      console.log('Usuario actualizado:', userUpdated);
      localStorage.setItem('token', token);
      localStorage.setItem('email_user', email);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  }

  deleteTokens(email: string | null) {
    // Eliminar el token del usuario con put
    if (!email) return;

    try {
      const response: any = this.http.get('http://localhost:3000/users?email=' + email);
      response.subscribe(async (users: any) => {
        if (users.length === 0) return;
        const user = users[0];
        const userUpdated = await this.http.put('http://localhost:3000/users/' + user.id, { ...user, token: '' }).toPromise();
        console.log('Token eliminado:', userUpdated);
      });
    } catch (error) {
      console.error('Error al eliminar el token:', error);
    }
  }


  async validateToken(token: string, email: string): Promise<boolean> {
    if (!token || !email) {
      return false;
    }

    try {
      const response: any = await this.http.get('http://localhost:3000/users?email=' + email).toPromise();
      if (response.length === 0) {
        return false;
      } else {
        const user = response[0];
        return user.token === token;
      }
    } catch (error) {
      console.error('Error al validar el token:', error);
      return false; // Manejar el error y devolver falso
    }
  }



  login(email: string, password: string) {
    if (!email || !password) {
      simpleAlert('Datos incorrectos', 'Los datos son incorrectos.' , 'error');
      return;
    }

    const users = this.http.get('http://localhost:3000/users?email=' + email);
    users.subscribe( async (response: any) => {
      console.log("response", response);
      if (response.length === 0) {
        simpleAlert('Usuario no encontrado', 'El usuario no existe en la base de datos.' , 'error');
      } else {
        const user = response[0];
        if (user.password === password) {
          await this.setTokens(email, user);
          await simpleAlertWithTimer('Inicio de sesión correcto', 'El inicio de sesión ha sido correcto.' , 'success' , 2000)
          this.router.navigate(['/dashboard']);
        } else {
          simpleAlert('Contraseña incorrecta', 'La contraseña es incorrecta.' , 'error');
        }
      }
    });
  }


  logout() {
    // Capturar el token del usuario y eliminarlo con put
    const email = localStorage.getItem('email_user');
    this.deleteTokens(email || '');
    localStorage.removeItem('token');
    localStorage.removeItem('email_user');
    this.router.navigate(['/login']);
  }
}
