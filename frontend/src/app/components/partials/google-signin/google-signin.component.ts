import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

declare global {
  interface Window {
    google: any;
  }
}
@Component({
  selector: 'google-signin',
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.css'
})

export class GoogleSigninComponent implements OnInit, OnDestroy  {
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  authSubscription!: Subscription;

  constructor(private authService: SocialAuthService, private userService: UserService, private messageService: MessageService) {}
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit() {
    this.authSubscription = this.authService.authState.subscribe((user) => {
      this.userService.handleLogin(user)
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Login successful',
      });
    });
  }
  createFakeGoogleWrapper = () => {
    const googleLoginWrapper = document.createElement('div');
    googleLoginWrapper.style.display = 'none';
    googleLoginWrapper.classList.add('custom-google-button');
    document.body.appendChild(googleLoginWrapper);
    window.google.accounts.id.renderButton(googleLoginWrapper, {
      type: 'icon',
      width: '200',
    });

    const googleLoginWrapperButton = googleLoginWrapper.querySelector(
      'div[role=button]'
    ) as HTMLElement;

    return {
      click: () => {
        googleLoginWrapperButton?.click();
      },
    };
  };

  handleGoogleLogin() {
    this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
}
}
