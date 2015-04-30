'use strict';

import {Component, React, Bus, Bacon} from 'Loxe';
import ProductItem from '../../../common/components/ProductItem';
import ProductsList from '../../../common/components/ProductsList';
import AppConstants from '../constants/AppConstants';

let {DomainEvents, ComponentEvents} = AppConstants;

class ProductItemContainer extends Component {

    observables = {
        [ComponentEvents.newItem$] : Bus.create()
    };

    onAddToCartClicked() {
        this.publish(ComponentEvents.newItem$, this.props.product);
    }

    render() {
        return (
            <ProductItem product={this.props.product} onAddToCartClicked={this.onAddToCartClicked.bind(this)} />
        );
    }
}

export default class ProductsListContainer extends Component {

    state = {
        products : []
    };

    componentWillReceiveObservables(observables) {
        this.subscribe(Bacon.combineTemplate({
            products : observables[DomainEvents.allProducts$]
        }), this.setState.bind(this));
    }

    render() {
        var nodes = this.state.products.map(function (product) {
            return <ProductItemContainer key={product.id} product={product} />;
        });

        return (
            <ProductsList title="Flux Shop Demo (Loxe)">
                {nodes}
            </ProductsList>
        );
    }

}
