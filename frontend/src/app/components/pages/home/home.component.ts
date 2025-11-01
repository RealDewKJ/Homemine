import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FurnitureService } from 'src/app/services/furniture.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Furniture } from 'src/app/shared/models/Furniture';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  furnitures:Furniture[] = [];
  constructor(private furnitureService:FurnitureService, activateRoute:ActivatedRoute,loadingService: LoadingService){
      let furnituresObservable:Observable<Furniture[]>;
    activateRoute.params.subscribe((params) => {

      if(params.searchTerm)
      furnituresObservable = this.furnitureService.getAllFurnitureBySearchTerm(params.searchTerm);
      else if(params.tag)
      furnituresObservable = this.furnitureService.getAllFurnitureByTag(params.tag);
      else
      furnituresObservable = furnitureService.getAll();
      loadingService.showLoading();

      furnituresObservable.subscribe({
        next: (serverFurnitures) => {
          if (serverFurnitures) {
            this.furnitures = serverFurnitures;
          }
        },
        error: (error) => {
          // Handle HTTP errors, e.g., status 500
          console.error('Error fetching furniture:', error);
          loadingService.hideLoading();
        },
        complete: () => {
          // This block will be executed on completion, including successful completion or error
          setTimeout(() => {
            loadingService.hideLoading();
          }, 300);
        }
      });
    })
  }

  ngOnInit(): void {
    this.furnitureService.getAll()
  }
}
