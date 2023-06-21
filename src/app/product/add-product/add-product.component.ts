import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {ProductService} from "../../service/product.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    description: new FormControl('', Validators.required)
  });

  createdProduct: Product = { id: 0, name: '', price: 0, quantity: 0, description: '' };

  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {}


  submit(): void {
    this.productService.createdProduct({
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      description: this.productForm.value.description,
    }).subscribe(data => {
        this.createdProduct = data;
        console.log(data);
        this.router.navigate(['/product']);
      }
    );
  };
}
