import {Component, KeyValueDiffers, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {NotificationService} from "../../service/notification.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required,Validators.min(4)]),
    confirmPassword: new FormControl('', [Validators.required,Validators.min(4)])
  });

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {}

  submit(): void {
    console.log(this.registerForm.value);

    this.authService.register({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('Successfully Registered!');
    }, error => {
      this.notificationService.showSnackBar('Something went wrong during registration');
    });
  }

}
