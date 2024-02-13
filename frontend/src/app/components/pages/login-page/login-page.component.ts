import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [MessageService]
})
export class LoginPageComponent implements OnInit {

  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  user: any;
  loggedIn: boolean = false;

  constructor(private formBuilder:FormBuilder, private userService: UserService, private router:Router, private route: ActivatedRoute,
    private messageService: MessageService,private loadingService: LoadingService){


  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['',Validators.required]
    })
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginForm.controls;
  }
  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this.userService.login({ email: this.fc.email.value, password: this.fc.password.value }).subscribe(
      (res) => {
        if (res) {
          this.loggedIn = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful',
          });

          setTimeout(() => {
            this.router.navigateByUrl(this.returnUrl);
            this.loggedIn = false;
          }, 3000);

        }
      },
      (errorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorResponse.error,
        });
      }
    );
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }
}
