import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FurnitureService } from 'src/app/services/furniture.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Furniture } from 'src/app/shared/models/Furniture';
import { __param } from 'tslib';

@Component({
  selector: 'app-furniture-page',
  templateUrl: './furniture-page.component.html',
  styleUrls: ['./furniture-page.component.css']
})
export class FurniturePageComponent implements OnInit {
  furniture!: Furniture;
  constructor(activatedRoute:ActivatedRoute, furnitureService:FurnitureService,
    private cartService:CartService, private router: Router,loadingService: LoadingService){
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      loadingService.showLoading()
       furnitureService.getFurnitureById(params.id).subscribe(serverFurniture => {
        if (serverFurniture) {
          this.furniture = serverFurniture;
          setTimeout(() => {
            loadingService.hideLoading()
          },300)
        }
       });

    })
  }
  ngOnInit(): void {

  }

  addToCart(){
    this.cartService.addToCart(this.furniture);
    this.router.navigateByUrl('/cart-page');
  }
}
