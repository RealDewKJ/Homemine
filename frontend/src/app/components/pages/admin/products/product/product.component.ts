import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FurnitureService } from 'src/app/services/furniture.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Furniture } from 'src/app/shared/models/Furniture';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [DatePipe],
})
export class ProductComponent implements OnInit {
  furnitures:any[] = [];
 constructor(private furnitureService: FurnitureService, private loadingService:LoadingService,private datePipe: DatePipe) {
  let furnituresObservable:Observable<Furniture[]>;
  furnituresObservable = furnitureService.getAll();
  loadingService.showLoading();

  furnituresObservable.subscribe({
    next: (serverFurnitures) => {
      if (serverFurnitures) {
        this.furnitures = serverFurnitures;
        this.furnitures.forEach(furniture => {
          furniture.createdAt = this.formatDate(furniture.createdAt);
        })
        console.log(this.furnitures)
      }
    },
    error: (error) => {
      console.error('Error fetching furniture:', error);
      loadingService.hideLoading();
    },
    complete: () => {
      setTimeout(() => {
        loadingService.hideLoading();
      }, 300);
    }
  });

 }
 ngOnInit(): void {

 }
 removeProduct(index:any) {

 }
 private formatDate(date: Date): string {
  // 'yyyy-MM-dd HH:mm' represents the desired format
  return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm') || '';
}
}
