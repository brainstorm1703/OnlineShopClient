import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/Product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {OrderService} from "../../service/order.service";
import {Order} from "../../models/Order";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {


  public productEditForm: FormGroup = new FormGroup({
    address: new FormControl(this.data.orderAddress, Validators.required),
    details: new FormControl(this.data.details, Validators.required)
  });
  editedProduct: Product = {id: 0, name: '', price: 0, quantity: 0, description: ''};

  constructor(private dialogRef: MatDialogRef<EditOrderComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: Order,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
  }


  submit(): void {
    this.orderService.updateOrder({
      orderAddress: this.productEditForm.value.address,
      details: this.productEditForm.value.details,
      status: this.data.status,
      userID: this.data.userID,
      id: this.data.id,
    }, this.data.id)
      .subscribe(() => {
        location.reload();
        this.notificationService.showSnackBar('Order updated successfully');
        this.dialogRef.close();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
