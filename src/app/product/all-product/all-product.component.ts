import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {User} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {ProductService} from "../../service/product.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditProductComponent} from "../edit-product/edit-product.component";

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  products: Product[] = [];
  isProductDataLoaded = false
  isAdmin = false;
  user: User = { id: 0, username: '', password: '' };

  constructor(private tokenService: TokenStorageService,
              private productService: ProductService,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.productService.getAllProduct()
      .subscribe(data => {
        console.log(data);
        this.products = data;
        this.isProductDataLoaded = true;
      })
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

  openEditDialog(i: number): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      id: this.products[i].id,
      name: this.products[i].name,
      price: this.products[i].price,
      quantity: this.products[i].quantity,
      description: this.products[i].description
    };
    this.dialog.open(EditProductComponent, dialogUserEditConfig);
  }


  deleteProduct(product: Product, i: number) {
    const result = confirm('Do you really want to delete this product?');
    if (result) {
      if (product.id != null) {
        this.productService.deleteProduct(product.id)
          .subscribe(() => {
            this.products.splice(i, 1);
            this.notificationService.showSnackBar('product deleted');
          });
      }
    }
  }
}
