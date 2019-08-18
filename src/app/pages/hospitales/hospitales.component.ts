import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/services.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital [] = [];
  desde: number = 0;
  cargando: boolean = true;

  constructor( public _hospitalService: HospitalService, public _modalUpLoadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUpLoadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospital(this.desde).subscribe(hospitales => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();

  }

  borrarHospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id, hospital.nombre).subscribe(() => {
      this.cargarHospitales();
    });

  }

  buscarHospital(termino: string) {

    if (termino.length <= 0){
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital(termino).subscribe(hospitales =>{
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
        if (!valor || valor.length <= 0) {
          return;
        }
          this._hospitalService.crearHospital(valor).subscribe(() => {
            this.cargarHospitales();
          });
    });
  }

  actualizarImagen(hospital: Hospital) {

    this._modalUpLoadService.mostrarModal('hospitales', hospital._id);


  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    
    if (desde >= this._hospitalService.totalHospitales ) {
      return;
    }
    
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
    // console.log(desde);
  }

}
