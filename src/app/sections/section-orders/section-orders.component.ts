import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor(private  salesData: SalesDataService) { }
  title = 'Angular Search Using ng2-search-filter';
  searchText;

  orders: Order[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.salesData.getOrders(this.page, this.limit)
    .subscribe((response) => {
        let res: any = response;
         // console.log('Result from getOrders: ', res);
        this.orders = res['page']['data'];
        this.total = res['page'].total;
        this.loading = false;
      },
      (error) => console.log(error));
  }

  // getOrders(): void {
  //   this.salesData.getOrders().subscribe(
  //     (response) => {
  //       this.orders = response;
  //     },
  //     (error) => console.log(error));
  // }

  goToPrevious(): void {
     // console.log('Previous Button Clicked!');
     this.page--;
     this.getOrders();
  }

  goToNext(): void {
     // console.log('Next Button Clicked!');
     this.page++;
     this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }
}

