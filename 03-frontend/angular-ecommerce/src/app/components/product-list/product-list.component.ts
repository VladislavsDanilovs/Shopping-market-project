import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  /* Injecting our ProductService*/
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  /* Method is invoked once you subscribe*/
  listProducts(){
    this.productService.getProductList().subscribe(
      //assigning result to the Product array
      data => {
        this.products = data;
      }
    )
  }
}
