'use strict';

import {Store, Subject} from 'loxe';
import AppConstants from '../constants/AppConstants';
import assign from 'object-assign';

let ActionTypes = AppConstants.ActionTypes;

export default class CartStore extends Store {

    /**
     * @type {Object<number, Object>}
     * @private
     */
    _products = {};

    /**
     * @type {Bus}
     */
    products$ = Subject.property(this.getAddedProducts());

    /**
     * @type {Bus}
     */
    total$ = Subject.property(this.getTotal());

    /**
     */
    constructor() {
        super();

        this.subscribeEvent(ActionTypes.ADD_TO_CART, (payload) => {
            this. _addToCart(payload.product);
            this.products$.next(this.getAddedProducts());
            this.total$.next(this.getTotal());
        });
        this.subscribeEvent(ActionTypes.CART_CHECKOUT, (payload) => {
            this._products = {};
            this.products$.next(this.getAddedProducts());
            this.total$.next(this.getTotal());
        });
        this.subscribeEvent(ActionTypes.SUCCESS_CHECKOUT, (payload) => {
            console.log('YOU BOUGHT:', payload.products);
        });
    }

    /**
     * @param {Object} product
     * @private
     */
    _addToCart(product) {
        let id = product.id;
        product.quantity = id in this._products ? this._products[id].quantity + 1 : 1;
        this._products[id] = assign({}, product[id], product);
    }

    getAddedProducts() {
        return Object.keys(this._products).map((id)=> {
            return this._products[id];
        });
    }

    getTotal() {
        let total = 0;
        for (let id in this._products) {
            let product = this._products[id];
            total += product.price * product.quantity;
        }
        return total.toFixed(2);
    }
}
