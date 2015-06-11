'use strict';

import {Store, Subject} from 'loxe';
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
    products$ = Subject.property(this.getAllProducts());

    /**
     */
    constructor() {
        super();

        this.subscribeEvent(ActionTypes.RECEIVE_PRODUCTS, (payload) => {
            console.log(payload);
            this._products = payload.products;
            this.products$.next(this.getAllProducts());
        });
        this.subscribeEvent(ActionTypes.ADD_TO_CART, (payload) => {
            this._decreaseInventory(payload.product);
            this.products$.next(this.getAllProducts());
        });
    }

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
