import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe]
})
export class ProductListComponent implements OnInit {
  public products: Product[];
  displayedColumns: string[] = ['brand', 'model', 'price'];

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
