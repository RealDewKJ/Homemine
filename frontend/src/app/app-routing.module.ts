import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FurniturePageComponent } from './components/pages/furniture-page/furniture-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { SuccessPageComponent } from './components/pages/success-page/success-page.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { adminGuard } from './auth/guards/admin.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
{path: 'search/:searchTerm', component:HomeComponent},
 {path: 'tag/:tag', component:HomeComponent},
 {path: 'furniture/:id',component:FurniturePageComponent},
 {path: 'cart-page',component:CartPageComponent},
 {path: 'login',component:LoginPageComponent},
 {path: 'register', component:RegisterPageComponent},
 {path: 'checkout', component:CheckoutPageComponent, canActivate:[authGuard]},
 {path: 'payment', component:PaymentPageComponent, canActivate:[authGuard]},
 {path: 'success', component: SuccessPageComponent, canActivate:[authGuard]},
 {path: 'admin', loadChildren: () => import('./components/pages/admin/admin.module').then(m => m.AdminModule) },
 {path: '**', component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
