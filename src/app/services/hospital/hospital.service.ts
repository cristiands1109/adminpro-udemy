import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  token: string;
  totalHospitales: number = 0;
  hospital: Hospital;


  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }


  cargarHospital(desde: number) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url).pipe(map((resp: any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));

  }

  obtenerHospital(id: string) {

     let url = URL_SERVICIOS + '/hospital/' + id;
     return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital(id: string, nombre: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(map(resp => {
      swal('Hospital Borrado', nombre + ' ha sido eliminado', 'success');
      return true;
    }));

  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre}).pipe(map((resp: any) => resp.hospital ));
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital).pipe(map((resp: any) => {
      swal('Hospital Actualizado', 'El nombre del hospital ha sido actualizado', 'info');
      return resp.hospital;
    }));

  }




}
