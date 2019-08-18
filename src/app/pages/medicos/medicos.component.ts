import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  desde: number = 0;
  medicos: Medico[] = [];
  cargando: boolean = true;
  constructor( public _medicoService: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;

    this._medicoService.buscarMedico(termino).subscribe(medicos => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }


  borrarMedicos(medico: Medico) {
    this._medicoService.borrarMedico(medico._id, medico.nombre).subscribe(() => {
      this.cargarMedicos();
    });
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos(this.desde).subscribe(medicos => {
      this.medicos = medicos;
      this.cargando = false;

    });
  }


  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    
    if (desde >= this._medicoService.totalMedicos ) {
      return;
    }
    
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
    // console.log(desde);
  }
}
