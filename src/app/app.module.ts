import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectService } from './services/select.service';
import { LoanComponent } from './home/loan/loan.component';
import { HeaderComponent } from './home/header/header.component';
import { UpdateComponent } from './home/update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { SuccessComponent } from './home/success/success.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { UpdateSuccessComponent } from './home/update-success/update-success.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LoanComponent,
    HeaderComponent,
    UpdateComponent,
    SuccessComponent,
    WelcomeComponent,
    UpdateSuccessComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule.forRoot({
      domain: 'dev-t3f2xuti.us.auth0.com',
      clientId: 'Hfepwf0wHdV6J61jGTmZb7AqrZXZH0r1'
    }),
  ],
  providers: [SelectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
