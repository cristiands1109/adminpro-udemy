

import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// para que funcione el routerlink
import { RouterModule } from '@angular/router';

// para que no tenga problemas el *ngfor 
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';



@NgModule({
    declarations: [
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        HeaderComponent,
        ModalUploadComponent
    ],
    exports: [
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        HeaderComponent,
        ModalUploadComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    providers: [],
})
export class SharedModule { }