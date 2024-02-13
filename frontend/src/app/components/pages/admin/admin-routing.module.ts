import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { adminGuard } from 'src/app/auth/guards/admin.guard';
import { ProductComponent } from './products/product/product.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';

export const adminRoutes: Routes = [
  { path: '', canActivate:[adminGuard], children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: AdminDashboardComponent},
    {path: 'products', component: ProductComponent},
    {path: 'products/create', component: ProductCreateComponent},
    {path: 'products/update/:id', component: ProductCreateComponent}
  ]}

]

@NgModule({
 imports: [RouterModule.forChild(adminRoutes)],
 exports: [RouterModule]
})
export class AdminRoutingModule { }
