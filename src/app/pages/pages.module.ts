import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';


// paginas
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

// modulo
import { SharedModule } from '../shared/shared.module';

// rutas
import { PAGES_ROUTING } from './pages.routes';


// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';


// ng2 charts
import { ChartsModule } from 'ng2-charts';





@NgModule({

    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTING,
        FormsModule,
        ChartsModule
    ]
})

export class PageModule { }
