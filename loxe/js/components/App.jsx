'use strict';

import {Component, React} from 'Loxe';
import CartContainer from './CartContainer';
import ProductsContainer from './ProductsContainer';

export default class App extends Component {
    render() {
        return (
            <div>
                <ProductsContainer/>
                <CartContainer/>
            </div>
        );
    }
}
