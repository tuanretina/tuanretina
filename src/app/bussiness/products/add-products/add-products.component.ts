import { ProductService } from 'src/app/services/products/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  addProductForm: FormGroup = new FormGroup({});
  constructor(public service: ProductService, public fb: FormBuilder, public toastr: ToastrService
    , private router: Router) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      'name': new FormControl(''),
      'details': new FormControl(''),
      'description': new FormControl(''),
      'releaseDate': new FormControl(''),
      'discontinuedDate': new FormControl(''),
      'rating': new FormControl(''),
      'price': new FormControl(''),
      'categoryID': new FormControl(''),
      'supplierID': new FormControl('')
    });
    this.service.listCategory();
    this.service.listSupplier();
  }

  createProduct() {
    this.service.addProduct(this.addProductForm.value).subscribe(data => {
      console.log("Product Created")
      this.router.navigateByUrl('/products/list');
      this.toastr.success('Create product successfully', 'Product Create');
    }, err => {
      console.log(err);
      this.toastr.error(err.error.title, 'Product Create failed.');
    })
  }

}
