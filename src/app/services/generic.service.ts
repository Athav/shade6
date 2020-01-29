import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  addProduct(prd) {
    console.log(prd)
    return this.http.post<{ msg: string, posts: any[] }>('http://localhost:3001/add-product/', prd);
  }

  getAllProducts() {
    // console.log('check')
    return this.http.post<{ msg: string, detail: any[] }>('http://localhost:3001/products/', '');
  }
  aggregateOnPrdName(name) {
    console.log(name);
    const prdName = {
      product_name: name
    }
    return this.http.post<{ msg: string, detail: any[] }>('http://localhost:3001/productsbyname/', prdName);
  }

  aggregateAverage(val) {
    const prdName = {
      aggVal: val
    }
    return this.http.post<{ msg: string, detail: any[] }>('http://localhost:3001/productsavg/', prdName);
  }
}
