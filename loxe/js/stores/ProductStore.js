'use strict';

import {Store, Bus} from 'Loxe';
import AppConstants from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;

export default class ProductStore extends Store {

    /**
     * @type {Array<Object>}
     * @private
     */
    _products = [];

    /**
     * @type {Bus}
     */
    products$ = Bus.create();

    /**
     * @type {Object<string, function>} dispatchReceiver
     */
    dispatchReceiver = {
        [ActionTypes.RECEIVE_PRODUCTS] : (payload)=> {
            this._products = payload.products;
            this.products$.emit(this.getAllProducts());
        },
        [ActionTypes.ADD_TO_CART]      : (payload)=> {
            this._decreaseInventory(payload.product);
            this.products$.emit(this.getAllProducts());
        }
    };

    /**
     * @param {Object} product
     * @private
     */
    _decreaseInventory(product) {
        product.inventory = product.inventory > 0 ? product.inventory-1 : 0;
    }

    getAllProducts() {
        return this._products;
    }
}
