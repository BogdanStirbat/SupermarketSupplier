import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts()
        .subscribe(products => this.products = products);
  }
}
