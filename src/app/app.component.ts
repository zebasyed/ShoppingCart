import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopping-cart';
  cartProductsCount = 0;
  

  ngOnInit() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart'));
    this.cartProductsCount = cart.length || 0;
  }


}
