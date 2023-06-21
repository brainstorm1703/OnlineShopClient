import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  public showSnackBar(message: string): void {
    this.snackbar.open(message, undefined, {
      duration: 2000
    });
  }

  public showMessage(message: string, s: any): void {
    this.snackbar.open(message + s.toString(), undefined, {
      duration: 2000
    });
  }
}
