import { Component } from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isLoggedIn = false;
  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }
}
