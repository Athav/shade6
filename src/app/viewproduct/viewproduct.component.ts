import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenericService } from '../services/generic.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export interface PRD {
  productId: any;
  productCode: any
  productName: any;
  productCategory: any;
  productPrice: any;
  productStock: any;
  storeCode: any;
}
@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit, OnDestroy {
  incomingPrd: Subscription;
  productForm: FormGroup;
  searchId: any;
  
  prdArr: PRD[] = [];
  constructor(
    private generic: GenericService,
    private route: Router
  ) {
    this.searchId = this.generic.reutrnPrdId();
    const prdVal = {
      namePrd: this.searchId
    }
    this.incomingPrd = this.generic.viewProduct(prdVal)
      .subscribe(arg => {
        if (arg != null && arg != undefined) {
          this.prdArr = arg.posts;        
        }
      });
  }
  productOk() {
    this.route.navigateByUrl('side-nav/product-list');
  }
  ngOnInit() {
    this.productForm = new FormGroup({
      productId: new FormControl({ value: '', disabled: true }, Validators.required),
      productCode: new FormControl({ value: '', disabled: true }, Validators.required),
      productName: new FormControl({ value: '', disabled: true }, Validators.required),
      productCategory: new FormControl({ value: '', disabled: true }, Validators.required),
      productPrice: new FormControl({ value: '', disabled: true }, Validators.required),
      productStock: new FormControl({ value: '', disabled: true }, Validators.required),
      storeCode: new FormControl({ value: '', disabled: true }, Validators.required),
    });
  }
  ngOnDestroy() {
    if (this.incomingPrd) {
      this.incomingPrd.unsubscribe()
    }

  }
}
