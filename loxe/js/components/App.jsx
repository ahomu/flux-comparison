'use strict';

import React from 'react';
import {provideContext, provideActions} from 'loxe';
import CartContainer from './CartContainer';
import ProductsContainer from './ProductsContainer';
import AppAction from '../actions/AppAction';

@provideContext()
@provideActions([ AppAction ])
class App extends React.Component {
    componentWillMount() {
        this.props.AppAction.getAllProducts();
    }
    render() {
        return (
            <div>
                <ProductsContainer/>
                <CartContainer/>
            </div>
        );
    }
}

export default App;
