import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  public products: Product[];
  displayedColumns: string[] = ['brand', 'model', 'price', 'actions'];

  constructor(private _productService: ProductService ){

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this._productService.get().subscribe(
      response => this.products = response
    );
  }
}
