
import { Routes, RouterModule } from '@angular/router';

// Importacion de componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Guards
import { LoginGuardGuard } from '../services/guards/login-guard.guard';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {tiutlo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {tiutlo: 'Progress Bar'} },
            { path: 'graficas1', component: Graficas1Component, data: {tiutlo: 'Graficas'} },
            { path: 'promesas', component: PromesasComponent, data: {tiutlo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: {tiutlo: 'Observables'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {tiutlo: 'Configuración'} },
            { path: 'perfil', component: ProfileComponent, data: {tiutlo: 'Perfil del Usuario'} },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
        ]
    }
];

export const PAGES_ROUTING = RouterModule.forChild ( pagesRoutes );
