import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    title: 'Products list',
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    title: 'Login Form Template',
    // canActivate: [authGuard]
  },
  {
    path: 'register-form',
    component: RegisterFormComponent,
    title: 'Register Form Template',
    // canActivate: [authGuard]
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'Details',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
  },

  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found Page',
  },
];

// pages
// components
// pipes
// services
// types
// guards
