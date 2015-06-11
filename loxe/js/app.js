'use strict';

import React from 'react';
import Rx from 'rx-lite';
import rxCombineTemplate from 'rx.observable.combinetemplate';
import { Subject } from 'loxe';

import App from './components/App';
import AppDomain from './domains/AppDomain';
import AppAction from './actions/AppAction';
import CartStore from './stores/CartStore';
import ProductStore from './stores/ProductStore';

Subject.setBuilder(new Subject.RxBuilder(Rx));
Subject.setCombineTemplate(rxCombineTemplate);

let appDomain = new AppDomain();

appDomain.registerStore(new ProductStore());
appDomain.registerStore(new CartStore());
appDomain.registerAction(new AppAction());

appDomain.mountRootComponent(App, document.getElementById('flux-app'));
