import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
  
  cargarUsuarios() {
  
  this.cargando = true;
  this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
    // console.log(resp);
    this.totalRegistros = resp.total;
    this.usuarios = resp.usuarios;
    this.cargando = false;
  });

  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    
    if (desde >= this.totalRegistros ) {
      return;
    }
    
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
    // console.log(desde);
  }

  buscarUsuario( termino: string ) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuario(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });

    console.log(termino);

  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
        swal('No se pudo eliminar usuario', 'No se puede borra a si mismo', 'error');
        return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a: ' + usuario.nombre,
      icon: 'warning' ,
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        console.log(borrar);
        if (borrar) {

          this._usuarioService.borrarUsuario(usuario._id, usuario.nombre).subscribe(borrado => {
            console.log(borrado);
            this.cargarUsuarios();
          });

        }
    });

  }

  
  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  



}
