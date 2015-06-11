'use strict';

import keyMirror from 'react/lib/keyMirror';

export default {

    ActionTypes: keyMirror({
        RECEIVE_PRODUCTS : null,
        ADD_TO_CART      : null,
        CART_CHECKOUT    : null,
        SUCCESS_CHECKOUT : null
    })

};
