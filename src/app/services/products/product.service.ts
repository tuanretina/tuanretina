import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/modules/products/ICategory';
import { ISupplier } from 'src/app/modules/products/ISupplier';
import { Product } from 'src/app/modules/products/product-model';
import { pageResult } from 'src/app/_shared/pageResult';
import { Result } from 'src/app/_shared/result';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  keyword: string = '';
  categories!: ICategory[];
  suppliers: ISupplier[] = [];
  productDetail: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  totalRecords: string = '';
  baseUrl: string = 'https://localhost:5001/api';
  constructor(private http: HttpClient) { }

  listCategory() {
    this.getCategory().toPromise().then(res => {
      this.categories = res.resultObj.items
      console.log(this.categories)
    });
  }

  listSupplier() {
    this.getSupplier().toPromise().then(res => {
      this.suppliers = res.resultObj.items
      console.log(this.suppliers)

    });
  }
  addProduct(productObj: any) {
    return this.http.post(this.baseUrl + '/Products', productObj);
  }

  editProduct(id: any, productObj: any) {
    return this.http.put(this.baseUrl + '/Products/' + id, productObj);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.baseUrl + '/Products/' + id);
  }


  refreshList() {
    this.getProductList().toPromise().then(res => {
      this.products = res.resultObj.items

    });
  }

  getProductById(id: string) {
    this.viewProduct(id).subscribe(res => {
      this.productDetail = res.resultObj
    });
  }

  takeTotalRecord() {
    this.getTotalRecord().toPromise().then(res => {
      this.totalRecords = res.resultObj.totalRecord
    });
  }

  getProductList(): Observable<Result<pageResult<Product[]>>> {
    return this.http.get<Result<pageResult<Product[]>>>(this.baseUrl +
      '/Products/paging?PageIndex=1&PageSize=150&Keyword=' + this.keyword);
  }

  viewProduct(id: string): Observable<Result<Product[]>> {
    return this.http.get<Result<Product[]>>(this.baseUrl +
      '/Products/' + id);
  }

  getTotalRecord(): Observable<Result<pageResult<Product[]>>> {
    return this.http.get<Result<pageResult<Product[]>>>(this.baseUrl + '/Products/paging?PageIndex='
      + this.pageIndex + '&PageSize=' + this.pageSize + '&Keyword=' + this.keyword);
  }

  getCategory(): Observable<Result<pageResult<ICategory[]>>> {
    return this.http.get<Result<pageResult<ICategory[]>>>(this.baseUrl + '/Categories');
    console.log(this.categories)

  }

  getSupplier(): Observable<Result<pageResult<ISupplier[]>>> {
    return this.http.get<Result<pageResult<ISupplier[]>>>(this.baseUrl + '/Supplier');

  }
}
