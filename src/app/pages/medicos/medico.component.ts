import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService } from 'src/app/services/services.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital [] = [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('', '', '', '', '');
  constructor( public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService) {

      activatedRoute.params.subscribe(params => {
        
        let id = params['id'];
        if ( id !== 'nuevo') {
          this.cargaMedico(id);
        }
      });
  }

  ngOnInit() {
    // this._hospitalService.cargarHospital().subscribe(hospitales => this.hospitales = hospitales);
    this._modalUploadService.notificacion.subscribe( (resp: any) => {
      console.log(resp);
      this.medico.img = resp.medico.img;
    });
  }

  guardarMedico(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe(medico => {
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
    });
    
  }

  cambioHospital( id: string) {
    this._hospitalService.obtenerHospital(id).subscribe(hospital => {
      console.log(hospital);
      this.hospital = hospital;
    });
  }

  cargaMedico(id: string) {
    this._medicoService.cargaMedico(id).subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }



}
