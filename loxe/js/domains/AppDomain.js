'use strict';

import {Domain} from 'Loxe';
import AppIntent from '../intents/AppIntent';
import AppDomainUtils from '../utils/AppDomainUtils';
import AppConstants from '../constants/AppConstants';

let {ActionTypes, DomainEvents} = AppConstants;

export default class AppDomain extends Domain {

    /**
     * @type {Array<Intent>}
     */
    intents = [AppIntent];

    /**
     * @returns {Domain}
     */
    prepare() {
        this.observables = {
            [DomainEvents.allProducts$]  : this.getStore('ProductStore').products$.toProperty(),
            [DomainEvents.cartProducts$] : this.getStore('CartStore').products$.toProperty(),
            [DomainEvents.cartTotal$]    : this.getStore('CartStore').total$.toProperty()
        };
    }

    receiveProducts(products) {
        this.dispatch(ActionTypes.RECEIVE_PRODUCTS, {
          products: products
        });
    }

    addToCart(product) {
        this.dispatch(ActionTypes.ADD_TO_CART, {
          product: product
        });
    }

    cartCheckout(products) {
        this.dispatch(ActionTypes.CART_CHECKOUT, {
          products: products
        });
        AppDomainUtils.checkoutProducts(products, this);
    }

    finishCheckout(products) {
        this.dispatch(ActionTypes.SUCCESS_CHECKOUT, {
          products: products
        });
    }

}
