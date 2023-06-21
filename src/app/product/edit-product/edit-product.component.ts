import {Component, Inject, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {ProductService} from "../../service/product.service";
import {number} from "ngx-custom-validators/src/app/number/validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  public productEditForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    price: new FormControl(this.data.price, [Validators.required, Validators.pattern('^[0-9]+$')]),
    quantity: new FormControl(this.data.quantity, [Validators.required, Validators.pattern('^[0-9]+$')]),
    description: new FormControl(this.data.description, Validators.required)
  });
  editedProduct: Product = {id: 0, name: '', price: 0, quantity: 0, description: ''};

  constructor(private dialogRef: MatDialogRef<EditProductComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
  }


  submit(): void {
    this.productService.updateProduct({
      name: this.productEditForm.value.name,
      price: this.productEditForm.value.price,
      quantity: this.productEditForm.value.quantity,
      description: this.productEditForm.value.description
    }, this.data.id)
      .subscribe(() => {
        location.reload();
        this.notificationService.showSnackBar('Product updated successfully');
        this.dialogRef.close();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
