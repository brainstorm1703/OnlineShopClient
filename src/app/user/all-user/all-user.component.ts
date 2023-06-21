import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit{
  users: User[] = [];
  isUserDataLoaded = false
  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router,
              private notificationService: NotificationService) { }
  ngOnInit(): void {
    this.userService.getAllUser()
      .subscribe(data => {
        console.log(data);
        this.users = data;
        this.isUserDataLoaded = true;
      })

  }

  deleteUser(user: User, id: number) {
    const result = confirm('Do you really want to delete this user?');
    if (result) {
      this.userService.deleteUser(user.id)
        .subscribe(() => {
          this.users.splice(id, 1);
          this.notificationService.showSnackBar('user deleted');
        });
    }

  }
}
