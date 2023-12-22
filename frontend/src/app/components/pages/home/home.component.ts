import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FurnitureService } from 'src/app/services/furniture.service';
import { Furniture } from 'src/app/shared/models/Furniture';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  furnitures:Furniture[] = [];
  constructor(private furnitureService:FurnitureService, activateRoute:ActivatedRoute){
      let furnituresObservable:Observable<Furniture[]>;
    activateRoute.params.subscribe((params) => {
      if(params.searchTerm)
      furnituresObservable = this.furnitureService.getAllFurnitureBySearchTerm(params.searchTerm);
      else if(params.tag)
      furnituresObservable = this.furnitureService.getAllFurnitureByTag(params.tag);
      else
      furnituresObservable = furnitureService.getAll();

      furnituresObservable.subscribe((serverFurnitures) => {
        this.furnitures = serverFurnitures;
      })
  })
  }

  ngOnInit(): void {
    this.furnitureService.getAll()
  }
}
