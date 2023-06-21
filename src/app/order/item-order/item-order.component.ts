import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {OrderItem} from "../../models/OrderItem";
import {OrderItemService} from "../../service/order-item.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-item-order',
  templateUrl: './item-order.component.html',
  styleUrls: ['./item-order.component.css']
})
export class ItemOrderComponent implements OnInit {
  orderItems: OrderItem[] = [];
  orderId: string | null = null;

  isOrderItemDataLoaded = false
  selectedQuantities: number[] = [];


  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService,
    private orderItemService: OrderItemService,
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId != null) {
      this.orderItemService.getAllOrderItem(Number(this.orderId))
        .subscribe(data => {
          console.log(data);
          this.orderItems = data;
          this.isOrderItemDataLoaded = true;
          this.selectedQuantities = this.orderItems.map(item => item.quantity);
        });
    }
  }

  updateQuantity(orderItem: OrderItem, number: number) {
    const quantity = this.selectedQuantities[number];
    if (quantity > orderItem.productID.quantity || quantity < 1) {
      this.notificationService.showMessage('Input Correct Quantity, min = 1, max = ', orderItem.productID.quantity);
    } else {
      if (this.orderId != null) {
        orderItem.quantity = quantity;
        this.orderItemService.updateOrderItem(orderItem, this.orderId)
          .subscribe(() => {
            this.notificationService.showSnackBar('Quantity updated successfully');
          });
      }
    }
  }

  deleteItemOrder(orderItem: OrderItem) {
    this.orderItemService.deleteOrderItem(orderItem.orderID.id,
      {
        productID: orderItem.productID,
        orderID: orderItem.orderID,
        quantity: orderItem.quantity,
        amount: orderItem.amount
      })
      .subscribe(data => {
        location.reload();
      });
  }
}
