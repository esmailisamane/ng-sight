import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Input() count: number;
  @Input() perpage: number;
  @Input() pagesToShow: number;
  @Input() loading: boolean;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }
  onNext(): void {
    this.goNext.emit(true);
  }
  onPage(n: number): void {
    this.goPage.emit(n);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perpage) || 0;
  }

  isLastPage(): boolean {
    return this.perpage * this.page >= this.count;
  }
  getMin(): number {
    return ((this.perpage * this.page) - this.perpage) + 1;
  }
  getMax(): number {
    let max = this.perpage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }
  getPages(): number[] {
     const totalpages = Math.ceil(this.count / this.perpage);
     const thispage = this.page || 1;
     const pagesTohow = this.pagesToShow || 9;
     const pages: number[] = [];
     pages.push(thispage);
     for (let i = 0; i < pagesTohow - 1; i++) {
       if (pages.length < pagesTohow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
       }
       if (pages.length < pagesTohow) {
         if (Math.max.apply(null, pages) < this.totalPages) {
         pages.push(Math.max.apply(null, pages) + 1);
         }
       }
     }
     pages.sort((a, b) => a - b);
     return pages;
  }
}
