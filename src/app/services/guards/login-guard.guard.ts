import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public router: Router, public _usuarioService: UsuarioService) {

  }

  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      console.log('Habilitado por el Guard');
      return true;
    } else {
      console.log('Bloqueador por el Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
