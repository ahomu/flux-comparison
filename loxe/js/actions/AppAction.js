'use strict';

import { Action } from 'loxe';
import shop from '../../../common/api/shop';
import AppConstants from '../constants/AppConstants';

let {ActionTypes} = AppConstants;

export default class AppAction extends Action {

    addToCart(product) {
        this.publish(ActionTypes.ADD_TO_CART, {
            product: product
        });
    }

    cartCheckout(products) {
        this.publish(ActionTypes.CART_CHECKOUT, {
            products: products
        });
        this.checkoutProducts(products, this);
    }

    /**
     * @param {AppDomain} appDomain
     */
    getAllProducts() {
        shop.getProducts((products)=> {
            this.publish(ActionTypes.RECEIVE_PRODUCTS, {
                products: products
            });
        });
    }

    /**
     * @param {Array<Object>} products
     * @param {AppDomain} appDomain
     */
    checkoutProducts(products) {
        shop.buyProducts(products, ()=> {
            this.publish(ActionTypes.SUCCESS_CHECKOUT, {
                products: products
            });
        });
    }
}
