import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { NewUser } from 'src/app/shared/models/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
  providers: [MessageService]
})
export class UserEditComponent implements OnInit {
  getUser!: NewUser;

  constructor(private userService: UserService, route:ActivatedRoute, private messageService: MessageService, private router: Router) {
    route.params.subscribe((params => {
      if (params.id) {
        userService.getUserById(params.id).subscribe({
          next: (user => {
           if (user) {
            this.getUser = user
           }
          })
        })
      }
    }))
  }


  ngOnInit(): void {

  }

  updateUser() {
    console.log(this.getUser)
    this.userService.updateUser(this.getUser).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: (res as any).message });
        setTimeout(() => {
          this.router.navigateByUrl('/admin/users');
        }, 1500);
      },
      error:(error) => {
        console.error(error)
      }
    })

  }
}
