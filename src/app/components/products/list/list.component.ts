import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import * as productsData from './../../../products.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  apiError = null;
  title: string = 'All Categories';
  products: any = (productsData as any).default;
  shoppingCart: any = this.cart;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    const slug = this.route.snapshot.params.slug;
    console.log(slug);
    if (slug) {
      this.title = slug;
      const filtered = this.products.filter(p => p[slug]);
      this.products = filtered.length > 0 ? filtered[0][slug] : [];
      this.apiError = filtered.length === 0 ? 'No product found in' : null;
    }
    else {
      const filtered = [];
      this.products.filter(p => {
        Object.values(p).forEach(el =>  filtered.push(el) );
      });

      this.products = [].concat(...filtered);
    }

  }

  addToCart(product) {

    const getCart = (this.cart === null) ? [] : this.cart;

    const newProduct = getCart.filter( p => {
      const ap = JSON.parse(p);
      return (ap.id === product.id)
    });

    if( newProduct.length === 0 ) {
      product.qty = 1;
      getCart.push(JSON.stringify(product));
      localStorage.setItem('shoppingCart', JSON.stringify(getCart));
    }
  }

  plusCart(id) {
    const getCart = this.cart;
    const newCart = getCart.map( p => {
      const ap = JSON.parse(p);
      if( ap.id === id ) {
        ap.qty++;
      }
      return JSON.stringify(ap);
    })
    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
    
  }

  minusCart(id) {
    const getCart = this.cart;
    const newCart = getCart.map( p => {
      const ap = JSON.parse(p);
      if( ap.id === id ) {
        if( ap.qty > 1 ) {
          ap.qty--;
        }
      }
      return JSON.stringify(ap);
    })
    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
  }

  findInCart(id) {
    const getCart = (this.cart === null) ? [] : this.cart;

    const newProduct = getCart.filter( p => {
      const ap = JSON.parse(p);
      return (ap.id === id) ? p : false
    });

    return newProduct.length === 0 ? false : true;
  }

  getQuantity(id) {
    const getCart = this.cart;
    const q = getCart.filter( p => {
      const ap = JSON.parse(p);
      if ( ap.id === id ) {
        return ap;
      }
    })
    return JSON.parse(q[0]).qty;
  }

  get cart() {
    return JSON.parse(localStorage.getItem('shoppingCart'))
  }

}
