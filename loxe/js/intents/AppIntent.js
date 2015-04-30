'use strict';

import {Intent} from 'Loxe';
import AppDomain from '../domains/AppDomain';
import AppConstants from '../constants/AppConstants';

let {ComponentEvents} = AppConstants;

export default class AppIntent extends Intent {

    /**
     * @param {Object<string, Observable>} observables
     */
    intentWillReceiveObservables(observables) {

        this.subscribe(observables[ComponentEvents.newItem$], (product) => {
            this.domain.addToCart(product);
        });

        this.subscribe(observables[ComponentEvents.checkout$], (products) => {
            this.domain.cartCheckout(products);
        })
    }
}
