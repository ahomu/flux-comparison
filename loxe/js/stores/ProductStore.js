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
     * @param {string} eventType
     * @param {object} payload
     */
    storeReceiveDispatch(eventType, payload) {
        switch (eventType) {
            case ActionTypes.RECEIVE_PRODUCTS:
                this._products = payload.products;
                this.products$.emit(this.getAllProducts());
                break;
            case ActionTypes.ADD_TO_CART:
                this._decreaseInventory(payload.product);
                this.products$.emit(this.getAllProducts());
                break;
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
