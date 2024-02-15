import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';
import { ProductComponent } from './products/product/product.component';
import { TableComponent } from '../../partials/table/table.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ChipsModule } from 'primeng/chips';
import { ToastModule } from 'primeng/toast';
import { OrderComponent } from './orders/order/order.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { LoadingComponent } from '../../partials/loading/loading.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    SidebarComponent,
    ProductComponent,
    TableComponent,
    ProductCreateComponent,
    OrderComponent,
    OrderDetailComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChipsModule,
    ToastModule
  ]
})
export class AdminModule { }
