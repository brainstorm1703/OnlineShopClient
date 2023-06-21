import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  isAdmin = false;
  user: User = { id: 0, username: '', password: '' };

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
      })
    this.userService.getRole()
      .subscribe(data => {
        if (data.message == 'ROLE_ADMIN'){
          this.isAdmin = true;
        }
      })
  }


  users() {
    this.router.navigate(['/user']);
  }

  products() {
    this.router.navigate(['/product']);
  }

  orders() {
    this.router.navigate(['/order']);
  }
}
