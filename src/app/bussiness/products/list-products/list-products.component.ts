import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'category'
    , 'supplier', 'description', 'releaseDate', 'discontinuedDate', 'rating', 'price', 'function'];
  constructor(public service: ProductService) { }

  ngOnInit(): void {
    this.service.refreshList();
    this.service.takeTotalRecord();
  }

  Search() {
    if (this.service.keyword == "") {
      this.ngOnInit();
    }
    else {
      this.service.refreshList();
      this.service.takeTotalRecord();
    }
  }
}
