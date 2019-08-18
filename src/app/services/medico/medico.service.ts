import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  
  totalMedicos: number = 0;
  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos(desde: number) {
    // let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    let url =  URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url).pipe(map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
    }));
  }
  
  buscarMedico(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.medicos));

  }

  borrarMedico(id: string, nombre: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('REGISTRO MEDICO ELIMINADO', nombre + ' ha sido borrado correctamente' , 'success');
      return true;
    }));

  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
    // ACTUALIZANDO
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico).pipe(map((resp: any) => {
        swal('MEDICO ACTUALIZADO', medico.nombre, 'success');
        return resp.medico;
      }));

    } else {
    // CREANDO

      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico).pipe(map((resp: any) => {
        swal('MEDICO CREADO', medico.nombre, 'success');
        return resp.medico;
      }));
    }



  }

  cargaMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.medico;
    }));
  }

}
