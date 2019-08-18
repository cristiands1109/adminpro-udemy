import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



// Modulos
import { PageModule } from './pages/pages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// rutas
import { APP_ROUTING } from './app.routes';

// servicios
import { ServiceModule } from './services/service.module';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    PageModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
