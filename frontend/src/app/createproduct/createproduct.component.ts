import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
  newProductForm = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl('')
  });

  constructor(
    public authenticationService: AuthenticationService,
    public productService: ProductService
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const name = this.newProductForm.value['name'];
    const quantity = this.newProductForm.value['quantity'];

    const product: Product = {
      name: name,
      quantity: quantity,
      id: 0
    }

    this.productService.createProduct(product);
  }
}
