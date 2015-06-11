'use strict';

import React from 'react';
import {Subject, provideActions, provideObservables} from 'loxe';
import Cart from '../../../common/components/Cart';
import AppAction from '../actions/AppAction'

@provideActions([ AppAction ])
@provideObservables(observables => ({
    products : observables.cartProducts$,
    total    : observables.cartTotal$.map((v) => v + '')
}))
class CartContainer extends React.Component {

    static defaultProps = {
        products : [],
        total    : '0'
    };

    onCheckoutClicked() {
        if (!this.props.products.length) {
            return;
        }
        this.props.AppAction.cartCheckout(this.props.products);
    }

    render() {
        return (
            <Cart
                products={this.props.products}
                total={this.props.total}
                onCheckoutClicked={this.onCheckoutClicked.bind(this)}
                />
        );
    }

}

export default CartContainer;
