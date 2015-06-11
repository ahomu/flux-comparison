'use strict';

import { Domain } from 'loxe';
import ProductStore from '../stores/ProductStore';
import CartStore from '../stores/CartStore';

class AppDomain extends Domain {

    /**
     * @returns {Object}
     */
    getObservables() {
        return {
            allProducts$  : this.getStore(ProductStore).products$,
            cartProducts$ : this.getStore(CartStore).products$,
            cartTotal$    : this.getStore(CartStore).total$
        };
    }
}

export default AppDomain;
