import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number | undefined;
  currentCategoryName: string | undefined;
  searchMode: boolean | undefined;

  /* Injecting our ProductService*/
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  /* Method is invoked once you subscribe*/
  listProducts() {
    // in search.component.ts we writed a method doSearch that will pass here
    // in app.module.ts we definied path: 'search/:keyword' that will come from here
    this.searchMode = this.route.snapshot.paramMap.has('keyword')!;
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    
    //now search for the products using given keyword
    this.productService.searchProducts(theKeyword).subscribe(
       data => {
         this.products = data;
       }
    )
  
  }

  handleListProducts() {

    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. Convert string to a numver using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      //not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';

    }
    //get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      //assigning result to the Product array
      data => {
        this.products = data;
      }
    )
  }
}
