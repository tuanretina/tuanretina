import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/products/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html',
  styleUrls: ['./delete-products.component.scss']
})
export class DeleteProductsComponent implements OnInit {
  productId: any;
  constructor(public service: ProductService, private activatedRoute: ActivatedRoute,
    public toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.productId = data.id;
    });
    // if (this.productId) {
    //   this.service.deleteProduct(this.productId).subscribe(data => {
    //     this.toastr.success('Delete product successfully', 'Product Delete');
    //     this.router.navigateByUrl('/products/list');
    //   }, err => {
    //     this.toastr.success(err.error.title, 'Product Delete');
    //   });
    // }
  }
  opensweetalert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.productId) {
          this.service.deleteProduct(this.productId).subscribe(data => {
            this.router.navigateByUrl('/products/list');
          }, err => {
            console.log(err);
          });
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}
