import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  headerHeight: number = 65;
  footerHeight: number = 50;
  bodyHeight: number = window.innerHeight - (this.headerHeight + this.footerHeight);
  buttons: any[] = [
    { value: 'add', btnName: 'Add' },
    // { value: 'edit', btnName: 'Edit' },
    // { value: 'delete', btnName: 'Delete' }
  ];

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.bodyHeight = window.innerHeight - (this.headerHeight + this.footerHeight);
  }
  constructor(
    private route: Router,
  ) { }
  dashBoard() {
    this.route.navigateByUrl('dashboard');
  }
  productProcess(btnName) {
    // console.log(btnName)
    if (btnName === 'Add') {
      this.route.navigateByUrl('dashboard/add-product');
    } else {

    }
  }
  ngOnInit() {
  }

}
