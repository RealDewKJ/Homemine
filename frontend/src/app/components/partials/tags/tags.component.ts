import { Component } from '@angular/core';
import { FurnitureService } from 'src/app/services/furniture.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent {
  tags?:Tag[];
  constructor(furnitureService:FurnitureService){
     furnitureService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
     });
  }
}
