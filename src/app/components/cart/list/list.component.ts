import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  apiError = null;
  title: string = 'My Shopping Cart';
  products: any = [];

  constructor() { }

  ngOnInit() {
    this.products = this.convertCartToObject();
    console.log(this.products);
  }

  remove(id) {

    var getCart = this.cart;
    const cIndex = getCart.findIndex(p => p.id == id);
    getCart.splice(cIndex, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(getCart));

    const pIndex = this.products.findIndex(p => p.id == id);
    this.products.splice(pIndex, 1);
  }

  removeAll() {
    localStorage.setItem('shoppingCart', JSON.stringify([]));
    this.products = [];
  }

  convertCartToObject() {
    const p = [];
    this.cart.map(e => {
      p.push( JSON.parse(e) )
    })
    return p;
  }

  get cart() {
    return JSON.parse(localStorage.getItem('shoppingCart'));
  }

}
