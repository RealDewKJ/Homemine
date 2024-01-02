import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PasswordMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { IUserRegister } from 'src/app/shared/interface/IUserRegister';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registerForm!: FormGroup;
  isSubmitted = false;

  returnUrl = ''

  constructor(private formBuilder: FormBuilder,
     private userService: UserService,
     private activatedRoute: ActivatedRoute,
     private router: Router) {

  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5)]],
      confirmPassword: ['',Validators.required],
      address: ['',[Validators.required,Validators.minLength(10)]]
    },{
      validators: PasswordMatchValidator('password', 'confirmPassword')
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    console.log(this.registerForm)
  }

  get fc() {
    return this.registerForm.controls
  }
  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm)
      return
    }
    const fv = this.registerForm.value
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    }
    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl)
    })
  }
}
