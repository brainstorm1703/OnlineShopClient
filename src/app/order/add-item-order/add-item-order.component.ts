import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../service/order.service";
import {ProductService} from "../../service/product.service";
import {OrderItemService} from "../../service/order-item.service";
import {NotificationService} from "../../service/notification.service";
import {Order} from "../../models/Order";
import {Product} from "../../models/Product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {every, mergeMap} from "rxjs";
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-add-item-order',
  templateUrl: './add-item-order.component.html',
  styleUrls: ['./add-item-order.component.css']
})
export class AddItemOrderComponent implements OnInit {
  orders: Order[] = [];
  product: Product = {id: 0, name: '', price: 0, quantity: 0, description: ''};
  productId: string | null = null;
  statusOption: string[] = [];
  isOrderDataLoaded = false
  isProductDataLoaded = false;
  productForm: FormGroup = new FormGroup({
    quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    order: new FormControl('', Validators.required)
  });
  user: User = {id: 0, username: '', password: ''};


  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService,
    private orderItemService: OrderItemService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        console.log(this.user.id);
      });
    this.orderService.getAllOrder()
      .subscribe(data => {
        console.log(data);
        this.orders = data;
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].userID.id == this.user.id) {
            this.statusOption.push('id: ' + this.orders[i].id + '; address: ' + this.orders[i].orderAddress);
          }
        }
        this.isOrderDataLoaded = true;
      });
    this.productService.getAllProduct()
      .subscribe(data => {
        console.log(data);
        this.orders = data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == this.productId) {
            this.product = data[i];
            break;
          }
        }
        this.isProductDataLoaded = true;
      });
  }

  submit(id: number | undefined) {
    const orderValue = this.productForm.get('order')?.value;
    const orderId = this.getOrderId(orderValue);
    console.log(orderId);
    if (orderId != null && this.product.id != null) {
      this.orderItemService.getAllOrderItem(orderId)
        .pipe(
          mergeMap((orderItems: any[]) => orderItems), // Type assertion to any[]
          every((orderItem: any) => {
            return !(orderItem.productID && orderItem.productID.id == this.product.id);
          })
        )
        .subscribe((productNotInOrder: boolean) => {
          if (productNotInOrder) {
            if (this.product.id != null) {
              this.orderItemService.createItemOrder({
                productID: this.product,
                orderID: this.orders[orderId],
                quantity: this.productForm.get('quantity')?.value,
                amount: this.product.price * this.productForm.get('quantity')?.value
              }, this.product.id, orderId)
                .subscribe(data => {
                  console.log(data);
                  this.router.navigate(['/product']);
                });
            }
          } else {
            this.notificationService.showSnackBar('This product is already in this order');
          }
        });
    }
  }

  private getOrderId(orderValue: any) {
    const parts = orderValue.split(';');
    let id: number | null = null;
    for (const part of parts) {
      if (part.includes('id')) {
        const idMatch = part.match(/(\d+)/);
        if (idMatch) {
          id = parseInt(idMatch[0]);
          break;
        }
      }
    }
    return id;
  }
}

