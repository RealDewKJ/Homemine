import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';
import { ProductComponent } from './products/product/product.component';
import { TableComponent } from '../../partials/table/table.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    SidebarComponent,
    ProductComponent,
    TableComponent,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
