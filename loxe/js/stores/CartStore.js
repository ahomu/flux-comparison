'use strict';

import {Store, Bus} from 'Loxe';
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
    products$ = Bus.create();

    /**
     * @type {Bus}
     */
    total$ = Bus.create();

    /**
     * @type {Object<string, function>} dispatchReceiver
     */
    dispatchReceiver = {
        [ActionTypes.ADD_TO_CART]      : (payload)=> {
            // TODO
            //AppDispatcher.waitFor([ProductStore.dispatchToken]);
            this. _addToCart(payload.product);

            this.products$.emit(this.getAddedProducts());
            this.total$.emit(this.getTotal());
        },
        [ActionTypes.CART_CHECKOUT]    : (payload)=> {
            this._products = {};

            this.products$.emit(this.getAddedProducts());
            this.total$.emit(this.getTotal());
        },
        [ActionTypes.SUCCESS_CHECKOUT] : (payload)=> {
            // this can be used to redirect to success page, etc.
            console.log('YOU BOUGHT:', payload.products);
        }
    };

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
