import { ProductService } from 'src/app/services/products/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {
  editProductForm: FormGroup = new FormGroup({});
  productId: any;
  dataLoaded: boolean = false;
  constructor(public service: ProductService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.activatedRoute.params.subscribe(data => {
      this.productId = data.id;
    });

    if (this.productId !== '') {
      //View user details
      this.service.viewProduct(this.productId)
        .toPromise()
        .then(data => {
          this.service.productDetail = data;
          console.log(this.service.productDetail)
          Object.assign(this.service.productDetail, data);
          //Build the edit form
          this.editProductForm = this.fb.group({
            'name': new FormControl(this.service.productDetail.resultObj.name),
            'description': new FormControl(this.service.productDetail.resultObj.description),
            'releaseDate': new FormControl(this.service.productDetail.resultObj.releaseDate),
            'discontinuedDate': new FormControl(this.service.productDetail.resultObj.discontinuedDate),
            'rating': new FormControl(this.service.productDetail.resultObj.rating),
            'price': new FormControl(this.service.productDetail.resultObj.price),
            'categoryID': new FormControl(this.service.productDetail.resultObj.categoryID),
            'supplierID': new FormControl(this.service.productDetail.resultObj.supplierID)
          })
          this.dataLoaded = true;
        })
        .catch(err => {
          console.log(err);
        })
    }
    this.service.listCategory();
    this.service.listSupplier();
  }
  updateProduct() {
    this.service.editProduct(this.productId, this.editProductForm.value).subscribe(data => {
      console.log("Product Updated")
      this.router.navigateByUrl('/products/list');
      this.toastr.success('Update product successfully', 'Product Update');
    }, err => {
      console.log(err);
      this.toastr.error(err.error.title, 'Product Update failed.');
    });
  }
}
