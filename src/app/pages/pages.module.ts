import { NgModule } from '@angular/core';

// paginas
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

// modulo
import { SharedModule } from '../shared/shared.module';

// rutas
import { PAGES_ROUTING } from './pages.routes';




@NgModule({

    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTING
    ]
})

export class PageModule { }
