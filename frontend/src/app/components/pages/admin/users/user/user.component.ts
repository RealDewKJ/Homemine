import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {  NewUser } from 'src/app/shared/models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [DatePipe]
})
export class UserComponent implements OnInit {
  getUsers: NewUser[] = [];

  constructor(userService: UserService, private datePipe: DatePipe) {
    userService.getAllUser().subscribe({
      next: (user) => {
        if (user) {
          this.getUsers = user
          this.getUsers.forEach((user => {
              user.updatedAt = this.formatDate(user.updatedAt);
          }))
        }
      }, error: (error) => console.error
    })
  }

  ngOnInit(): void {
  }

  private formatDate(date: Date | string): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm') || '';

  }
}

