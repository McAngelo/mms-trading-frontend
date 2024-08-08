import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 0; 
  @Output() pageChange = new EventEmitter<number>();

  totalPages: number = 0;
  visiblePages: number[] = [];
  Math: any = Math;

  ngOnInit() {
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.calculateVisiblePages();
  }

  calculateVisiblePages() {
    const pages: number[] = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    if (totalPages <= 1) {
      return;
    }

    let startPage: number, endPage: number;

    if (totalPages <= 5) {
      startPage = 0;
      endPage = totalPages - 1;
    } else {
      const pageLimit = 3;

      if (currentPage <= pageLimit) {
        startPage = 0;
        endPage = Math.min(totalPages - 1, pageLimit * 2);
      } else if (currentPage + pageLimit >= totalPages - 1) {
        startPage = Math.max(0, totalPages - pageLimit * 2 - 1);
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - pageLimit;
        endPage = currentPage + pageLimit;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    this.visiblePages = pages;
  }

  onPageChange(page: number) {
    if (page < 0 || page >= this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.calculateVisiblePages();
    this.pageChange.emit(page);
  }

  previousPage() {
    this.onPageChange(this.currentPage - 1);
  }

  nextPage() {
    this.onPageChange(this.currentPage + 1);
  }
}
