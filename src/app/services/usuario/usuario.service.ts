import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    // console.log('Servicio de usuario listo para usarse');
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;

  }

  logOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }


  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token}).pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));

  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) { 
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map((resp: any) => {

      this.guardarStorage(resp.id, resp.token, resp.usuario);

        return true;
    }));

  }

  crearUsuario(usuario: Usuario) {

  const url = URL_SERVICIOS + '/usuario';

  return this.http.post(url, usuario).pipe(map((resp: any) => {

    swal("USUARIO CREADO", usuario.email, "success");
    return resp.usuario;

  }));

  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(map((resp: any) => {
      if (usuario._id === this.usuario._id) {
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
      }
      swal("USUARIO ACTUALIZADO", usuario.nombre, "success");

      return true;

    }));
  }

  cambiarImagen( archivo: File, id: string) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id).then((resp: any) => {

      // console.log(resp);
      this.usuario.img = resp.usuario.img;
      swal("IMAGEN CAMBIADA CORRECTAMENTE", this.usuario.nombre, "success");
      this.guardarStorage(id, this.token, this.usuario);
      
    }).catch((resp: any) => {

      // console.log(resp);

    });
    
  }

  cargarUsuarios(desde: number) {
    
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios));

  }

  borrarUsuario( id: string, nombre: string) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).pipe(map( resp =>{
        swal('Usuario borrado', 'El usuario ' + nombre + ' ha sido correctamente eliminado', 'success');
        return true;
    }));

  }

}
