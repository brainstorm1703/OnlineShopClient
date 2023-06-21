import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {TokenStorageService} from "./service/token-storage.service";
import {LoginComponent} from "./auth/login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'onlineShopClient';

  constructor(private tokenService: TokenStorageService,
              private router: Router) {
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

}
