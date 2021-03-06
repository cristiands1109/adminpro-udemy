import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  SettingsService,
          SidebarService,
          SharedService,
          UsuarioService,
          LoginGuardGuard,
          AdminGuard,
          HospitalService,
          MedicoService,
          VerificaTokenGuard} from './services.index';
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivoService } from './services.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';




@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
