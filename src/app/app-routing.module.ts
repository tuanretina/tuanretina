import { LoginComponent } from './bussiness/users/login/login.component';
import { RegistrationComponent } from './bussiness/users/registration/registration.component';
import { UsersComponent } from './bussiness/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './bussiness/products/list-products/list-products.component';
import { AuthGuard } from './bussiness/auth/auth.guard';
import { DeleteProductsComponent } from './bussiness/products/delete-products/delete-products.component';
import { ViewProductsComponent } from './bussiness/products/view-products/view-products.component';
import { EditProductsComponent } from './bussiness/products/edit-products/edit-products.component';
import { AddProductsComponent } from './bussiness/products/add-products/add-products.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  {
    path: 'user', component: UsersComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'products', canActivate: [AuthGuard],
    children: [
      { path: '', component: ListProductsComponent },
      { path: 'list', component: ListProductsComponent },
      { path: 'delete/:id', component: DeleteProductsComponent },
      { path: 'view/:id', component: ViewProductsComponent },
      { path: 'edit/:id', component: EditProductsComponent },
      { path: 'create', component: AddProductsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
