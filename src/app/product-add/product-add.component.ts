import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericService } from './../services/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private generic: GenericService,
    private route: Router
  ) { }

  saveProduct() {
    console.log(this.productForm)
    if (this.productForm.invalid) {
      this.generic.openSnackBar('Fields should not be empty', 'Close');
      return;
    } else {
      const prod = {
        prodId: this.productForm.value.productId,
        prodCode: this.productForm.value.productCode,
        prodName: this.productForm.value.productName,
        prodCategory: this.productForm.value.productCategory,
        prodPrice: this.productForm.value.productPrice,
        prodStock: this.productForm.value.productStock,
        storeCode: this.productForm.value.storeCode,
      }
      this.generic.addProduct(prod).subscribe(prd => {
        console.log(prd)
        if (prd.msg === 'Product added') {
          this.generic.openSnackBar(prd.msg, 'Close');
          this.route.navigateByUrl('/dashboard')
        } else {
          this.generic.openSnackBar(prd.msg, 'Close');
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
