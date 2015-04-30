'use strict';

import {Component, React, Bus, Bacon} from 'Loxe';
import Cart from '../../../common/components/Cart';
import AppConstants from '../constants/AppConstants';

let {DomainEvents, ComponentEvents} = AppConstants;

export default class CartContainer extends Component {

    observables = {
        [ComponentEvents.checkout$] : Bus.create()
    };

    state = {
        products : [],
        total    : '0'
    };

    componentWillReceiveObservables(observables) {
        this.subscribe(Bacon.combineTemplate({
            products : observables[DomainEvents.cartProducts$],
            total    : observables[DomainEvents.cartTotal$].map((v) => v + '')
        }), this.setState.bind(this));
    }

    onCheckoutClicked() {
        if (!this.state.products.length) {
            return;
        }
        this.publish(ComponentEvents.checkout$, this.state.products);
    }

    render() {
        return (
            <Cart
                products={this.state.products}
                total={this.state.total}
                onCheckoutClicked={this.onCheckoutClicked.bind(this)}
                />
        );
    }

}
