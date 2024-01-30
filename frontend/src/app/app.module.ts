import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from "@abacritt/angularx-social-login";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';

import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FurniturePageComponent } from './components/pages/furniture-page/furniture-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { GoogleSigninComponent } from './components/partials/google-signin/google-signin.component';


import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StarRatingsComponent } from './components/partials/star-ratings/star-ratings.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptors';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { PaymentButtonComponent } from './components/partials/payment-button/payment-button.component';
import { DropdownModule } from 'primeng/dropdown';
import { SuccessPageComponent } from './components/pages/success-page/success-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FurniturePageComponent,
    CartPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PaymentPageComponent,
    CheckoutPageComponent,
    SuccessPageComponent,
    TitleComponent,
    NotFoundComponent,
    StarRatingsComponent,
    LoadingComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentButtonComponent,
    GoogleSigninComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('997182945022-ig82r87bg4atbfeceq64len7iv7ngldo.apps.googleusercontent.com', {
              scopes: 'openid profile email',
            }),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
