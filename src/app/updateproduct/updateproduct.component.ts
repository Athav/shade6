import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericService } from '../services/generic.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  productForm: FormGroup;
  incomingPrd: Subscription;
  searchId: any;
  prdArr: any[];
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
          this.prdArr.forEach(ele => {
          })
        }
      });
  }

  updateProduct(id, pcode, pname, pcate, pprice, pstock, store) {
    const prod = {
      prodId: id.value,
      prodCode: pcode.value,
      prodName: pname.value,
      prodCategory: pcate.value,
      prodPrice: pprice.value,
      prodStock: pstock.value,
      storeCode: store.value,
    }
    if (
      id.value == '' ||
      pcode.value == '' ||
      pname.value == '' ||
      pcate.value == '' ||
      pprice.value == '' ||
      pstock.value == '' ||
      store.value == ''
    ) {
      this.generic.openSnackBar('Fields should not be empty', 'Close');
      return;
    } else {
      this.generic.updateProduct(prod).subscribe(data => {
        if (data.msg === 'Product updated') {
          this.route.navigateByUrl('side-nav/product-list');
        }
      })
    }
  }
  ngOnInit() {
    this.productForm = new FormGroup({
      productId: new FormControl('', { validators: [Validators.required, Validators.minLength(1)] }),
      productCode: new FormControl('', { validators: [Validators.required, Validators.minLength(1)] }),
      productName: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
      productCategory: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
      productPrice: new FormControl('', { validators: [Validators.required, Validators.minLength(1)] }),
      productStock: new FormControl('', { validators: [Validators.required, Validators.minLength(1)] }),
      storeCode: new FormControl('', { validators: [Validators.required, Validators.minLength(1)] }),
    });
  }

}
