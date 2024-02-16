import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FurnitureService } from 'src/app/services/furniture.service';
interface form {
  name: string,
  field: string,
  type: string
}
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  providers: [MessageService]
})

export class ProductCreateComponent implements OnInit {
  formData!: form[];
  mode: string = 'Create'
  max = 3;
  productData: any = {
    id: '',
    name: '',
    imageUrl: '',
    price: 0,
    remainQuantity: 0,
    favorite: true,
    origins: [],
    tags: [],
    stars: 0
  }

  constructor(private route: ActivatedRoute, private furnitureService: FurnitureService,
    private messageService: MessageService, private router: Router){
    route.params.subscribe((params) => {
      if(params.id) {
        this.mode = 'Edit'
        furnitureService.getFurnitureById(params.id).subscribe(serverFurniture => {
          if (serverFurniture) {
            this.productData = serverFurniture;
          }
        })
      }
  })
  }

  ngOnInit(): void {
    this.formData = [
      {
          name: 'Name',
          field: 'name',
          type:''
      },
      {
          name: 'Image',
          field: 'imageUrl',
          type: 'upload-image'
      },
      {
          name: 'Price',
          field: 'price',
          type:''
      },
      {
          name: 'Quantity',
          field: 'remainQuantity',
          type:''
      },
      {
        name: 'Origins',
        field: 'origins',
        type:''
      },
      {
        name: 'Stars',
        field: 'stars',
        type:''
      }
  ]
  }
  updateFurniture() {
    if (this.mode === 'Create') {
      this.productData.origins = [this.productData.origins];
      this.furnitureService.createFurniture(this.productData).subscribe({
        next:(res) => {
          this.router.navigateByUrl('/admin/products')
          this.messageService.add({ severity: 'success', summary: 'Success', detail: (res as any).message });
        },
        error:(e) => {
          console.error(e)
        }
      })
    } else {
      this.furnitureService.updateFurniture(this.productData).subscribe({
        next:(res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: (res as any).message,
            life: 3000
          });

          setTimeout(() => {
            this.router.navigateByUrl('/admin/products');
          }, 1500);
        },
        error:(e) => {
          console.error(e)
        }
      })
    }

  }
}
