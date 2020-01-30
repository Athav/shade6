import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  viewProd: any = new Subject<any>();
  prdId: any;
  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient) { }

  // Generic function for snackbar to user message
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  // Addition of product
  addProduct(prd) {
    return this.http.post<{ msg: string, posts: any[] }>('http://localhost:3001/add-product/', prd);
  }

  // Product detail
  viewProduct(val) {
    this.prdId = val.namePrd
    this.http.post<{ msg: string, posts: any[] }>('http://localhost:3001/view-product/', val)
      .subscribe(arg => {
        this.viewProd.next(arg);
      });
    return this.http.post<{ msg: string, posts: any[] }>('http://localhost:3001/view-product/', val);
  }
  reutrnPrdId() {
    return this.prdId;
  }
  returnViewPrd() {
    return this.viewProd.asObservable();
  }

  // Update product
  updateProduct(val) {
    return this.http.post<{ msg: string, posts: any[] }>('http://localhost:3001/update-product/', val);
  }

  // Delete product
  deleteProduct(val) {
    const codePrd = {
      pCode: val
    }
    return this.http.post<{ msg: string }>('http://localhost:3001/deleteone/', val);
  }

  // Getting all products by descending order
  getAllProducts() {
    return this.http.post<{ msg: string, detail: any[] }>('http://localhost:3001/products/', '');
  }

  // Aggregation bt product code
  aggregateOnPrdName(name) {
    const prdName = {
      product_name: name
    }
    return this.http.post<{ msg: string, detail: any[] }>('http://localhost:3001/productsbyname/', prdName);
  }

  // Average aggregation
  aggregateAverage(val) {
    const prdName = {
      aggVal: val
    }
    return this.http.post<{ msg: string, detail: any[] }>('http://localhost:3001/productsavg/', prdName);
  }


}
