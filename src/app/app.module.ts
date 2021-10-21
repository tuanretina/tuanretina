import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { UsersComponent } from './bussiness/users/users.component';
import { LoginComponent } from './bussiness/users/login/login.component';
import { RegistrationComponent } from './bussiness/users/registration/registration.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductsModule } from './bussiness/products/products.module';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    AppRoutingModule,
    LayoutModule,
    ProductsModule,
    BrowserAnimationsModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar: true
    }),
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
