import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/Product";
import {ProductService} from "../../service/product.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {Order} from "../../models/Order";
import {User} from "../../models/User";
import {OrderService} from "../../service/order.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  orderForm: FormGroup = new FormGroup({
    address: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    //status: new FormControl('', Validators.required),
  });
  private user: User = {id: 0, username: '', password: ''};

  constructor(private orderService: OrderService,
              private notificationService: NotificationService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        console.log(this.user.id);
      })
  }


  submit(): void {
    this.orderService.createdOrder({
      orderAddress: this.orderForm.value.address,
      details: this.orderForm.value.details,
    }).subscribe(data => {
        this.router.navigate(['/order']);
      }
    );
  };
}
