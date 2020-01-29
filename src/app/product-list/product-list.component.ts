import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { GenericService } from './../services/generic.service';
import { Router } from '@angular/router';
export interface PeriodicElement {
  productId: any;
  productCode: any;
  productName: any;
  productCategory: any;
  productPrice: any;
  productStock: any;
  storeCode: any;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Action
  displayedColumns: string[] = ['productId', 'productCode', 'productName', 'productCategory', 'productPrice', 'productStock', 'storeCode', 'Action'];
  displayedColumns1: string[] = ['productId', 'productCode', 'productName', 'productCategory', 'productPrice', 'productStock', 'storeCode'];
  displayedColumnsForAvg: string[] = ['productCode', 'AveragePrice'];
  dataSource = new MatTableDataSource<any>();
  dataSourceAggregate = new MatTableDataSource<any>();
  dataSourceAggregateAvg = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  arr: any[];
  aggregateArr: any[];
  aggregateAvgArr: any[];
  constructor(
    private generic: GenericService,
    private route: Router,
    public dialog: MatDialog
  ) {
    this.generic.getAllProducts().subscribe(arg => {
      this.arr = [...arg.detail];
      // console.log(this.arr);
      this.dataSource = new MatTableDataSource([...this.arr]);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyAggregate(aggregateValue: string) {
    this.generic.aggregateOnPrdName(aggregateValue).subscribe(agg => {
      if (agg.msg === 'Aggregate successful') {
        this.aggregateArr = [...agg.detail]
        this.dataSourceAggregate = new MatTableDataSource([...this.aggregateArr]);
      } else {
        this.generic.openSnackBar('Aggregate not applied', 'Close')
      }
    });
  }

  aggregateForAvg(aggregateValue: string) {
    this.generic.aggregateAverage(aggregateValue).subscribe(agg => {
      if (agg.msg === 'Aggregate avg successful') {
        this.aggregateAvgArr = [...agg.detail]
        this.dataSourceAggregateAvg = new MatTableDataSource([...this.aggregateAvgArr]);
      } else {
        this.generic.openSnackBar('Aggregate not applied', 'Close')
      }
    });
  }

  addProduct() {
    this.route.navigateByUrl('dashboard/add-product');
  }

  details(val) {
    console.log(val);
    this.route.navigateByUrl('dashboard/view-product');
  }
  update(val) {
    console.log(val);
    this.route.navigateByUrl('dashboard/update-product');
  }
  delete(val) {
    console.log(val);
    this.openDialog(val);
    // this.route.navigateByUrl('dashboard/add-product');
  }
  openDialog(dataPrd) {
    this.dialog.open(DialogDataExampleDialog, {
      disableClose: true,
      data: dataPrd
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceAggregate.paginator = this.paginator;
    this.dataSourceAggregateAvg.paginator = this.paginator;
  }

}

@Component({
  selector: 'conf-dialog',
  templateUrl: 'conf.dialog.html',
  styleUrls: ['./product-list.component.css']
})
export class DialogDataExampleDialog implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }
  ngOnInit() { }
}