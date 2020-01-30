import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menus: any[] = [
    { value: 'Product', btnName: 'Product' },
    { value: 'Customer', btnName: 'Customer' },
    { value: 'Till', btnName: 'Till' },
    { value: 'Misc', btnName: 'Misc' },
    { value: 'Walk In', btnName: 'Walk In' },
    { value: 'Sync', btnName: 'Sync' },
    { value: 'Activities', btnName: 'Activities' },
    { value: 'Day Close', btnName: 'Day Close' },
    { value: 'Exit', btnName: 'Exit' },
  ];
  constructor(
    private route: Router
  ) { }
  navigateMenu(menu) {
    if (menu === 'Product') {
      this.route.navigateByUrl('side-nav/product-list');
    } else if(menu === ''){

    }
  }
  ngOnInit() {
  }

}
