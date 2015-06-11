'use strict';

import React from 'react';
import {provideActions, provideObservables} from 'loxe';
import ProductItem from '../../../common/components/ProductItem';
import ProductsList from '../../../common/components/ProductsList';
import AppAction from '../actions/AppAction';

@provideActions([ AppAction ])
class ProductItemContainer extends React.Component {

    onAddToCartClicked() {
        this.props.AppAction.addToCart(this.props.product);
    }

    render() {
        return (
            <ProductItem product={this.props.product} onAddToCartClicked={this.onAddToCartClicked.bind(this)} />
        );
    }
}

@provideObservables(observables => ({
    products : observables.allProducts$
}))
class ProductsListContainer extends React.Component {

    static defaultProps = {
        products : []
    };

    render() {
        var nodes = this.props.products.map(function (product) {
            return <ProductItemContainer key={product.id} product={product} />;
        });

        return (
            <ProductsList title="Flux Shop Demo (Loxe)">
                {nodes}
            </ProductsList>
        );
    }

}

export default ProductsListContainer;
