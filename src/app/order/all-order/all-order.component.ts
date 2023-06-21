import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {Order} from "../../models/Order";
import {OrderService} from "../../service/order.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditProductComponent} from "../../product/edit-product/edit-product.component";
import {EditOrderComponent} from "../edit-order/edit-order.component";

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})
export class AllOrderComponent implements OnInit {
  orders: Order[] = [];
  isOrderDataLoaded = false
  isAdmin = false;
  user: User = {id: 0, username: '', password: ''};

  selectedStatus: string[];
  statusOption: string[] = ['new order', 'performing order', 'finished order'];


  constructor(private tokenService: TokenStorageService,
              private orderService: OrderService,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog,
              private notificationService: NotificationService) {
    this.selectedStatus = [];
  }

  ngOnInit(): void {
    this.orderService.getAllOrder()
      .subscribe(data => {
        console.log(data);
        this.orders = data;
        for (let i = 0; i < this.orders.length; i++) {
          this.selectedStatus.push(this.orders[i].status);
        }
        this.isOrderDataLoaded = true;
      });
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        console.log(this.user.id);
      });
    this.userService.getRole()
      .subscribe(data => {
        if (data.message == 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
      });
  }

  deleteOrder(order: Order, i: number) {
    const result = confirm('Do you really want to delete this order?');
    if (result) {
      if (order.id != null) {
        this.orderService.deleteOrder(order.id)
          .subscribe(() => {
            this.orders.splice(i, 1);
            this.notificationService.showSnackBar('order deleted');
          });
      }
    }
  }

  openEditDialog(i: number): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      id: this.orders[i].id,
      orderAddress: this.orders[i].orderAddress,
      details: this.orders[i].details,
      status: this.orders[i].status,
      userID: this.orders[i].userID
    };
    this.dialog.open(EditOrderComponent, dialogUserEditConfig);
  }

  updateStatus(order: Order, i: number) {
    console.log(i);
    order.status = this.selectedStatus[i];
    this.orderService.updateOrderStatus(order, order.id).subscribe(() => {
      this.notificationService.showSnackBar('order status updated');
    });

  }
}
