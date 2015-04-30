'use strict';

import shop from '../../../common/api/shop';

export default {

  /**
   * @param {AppDomain} appDomain
   */
  getAllProducts(appDomain) {
    shop.getProducts((products)=> {
      appDomain.receiveProducts(products);
    });
  },

  /**
   * @param {Array<Object>} products
   * @param {AppDomain} appDomain
   */
  checkoutProducts(products, appDomain) {
    shop.buyProducts(products, ()=> {
      appDomain.finishCheckout(products);
    });
  }

}
