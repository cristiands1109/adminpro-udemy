import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from 'src/app/services/services.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(public _subriArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }
  
  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }

  subirImagen() {
    
    this._subriArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then((resp: any) => {
      // console.log(resp);
      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal(); 

    }).catch(err =>{
      console.log('error en la carga de imagen');
    });
  }

  seleccionImagen( archivo: File ) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('SOLO IMAGENES', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  
  }

}
