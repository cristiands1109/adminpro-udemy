import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode'
import { UsuarioService } from '../usuario/usuario.service';
import { resolve } from 'path';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean  {
      console.log('token guard');
      let token = this._usuarioService.token;
      let payload = JSON.parse(atob(token.split('.')[1]));
      let expirado = this.expirado(payload.exp);


      if (expirado) {
        this.router.navigate(['/login']);
        return false;
      }

      return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExpiracion: number ): Promise<boolean> {
    
    return new Promise((resolve, reject) => {
      
      let tokenExp = new Date(fechaExpiracion * 1000);
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000));

      // console.log(tokenExp);
      // console.log(ahora);

      if (tokenExp.getTime() > ahora.getTime() ){

        resolve(true);

      } else {
        this._usuarioService.renovarToken().subscribe( () => {
          resolve(true);
        }, () => {
          reject(false);
          this.router.navigate(['/login']);
        });
      }


    });

  }

  expirado( fechaExpiracion: number ) {

    let ahora = new Date().getTime() / 1000;
    if (fechaExpiracion < ahora ) {
      return true;
    } else {
      return false;
    }

  }
  
}
