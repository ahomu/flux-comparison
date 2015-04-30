'use strict';

import {React} from 'Loxe';
import App from './components/App';
import AppDomain from './domains/AppDomain';
import AppDomainUtils from './utils/AppDomainUtils';
import AppIntent from './intents/AppIntent';
import CartStore from './stores/CartStore';
import ProductStore from './stores/ProductStore';

let appDomain = new AppDomain();

appDomain.addStore(new ProductStore());
appDomain.addStore(new CartStore());
appDomain.prepare();

AppDomainUtils.getAllProducts(appDomain);

React.render(
    React.createFactory(App)({domain : appDomain}),
    document.getElementById('flux-app')
);
