import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {
  toolbarColor: string = 'primary';
  headerHeight: number = 64;
  footerHeight: number = 50;
  bodyHeight: number = window.innerHeight - this.headerHeight;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @HostListener('window:resize', ['$event'])
  // apply dynamic height when screen gets resize
  getScreenSize(event?) {
    this.bodyHeight = window.innerHeight - this.headerHeight;
  }
  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: Router) { }
  // Route to dashboard
  dashBoard() {
    this.route.navigateByUrl('side-nav');
  }
  // Route to product list
  goToList() {
    this.route.navigateByUrl('side-nav/product-list');
  }
}
