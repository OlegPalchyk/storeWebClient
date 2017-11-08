import React from "react";
import {  Route, Switch , Redirect} from 'react-router';

import asyncComponent from '../../components/AsyncComponent/AsyncComponent';
const AsyncHome = asyncComponent(() => import('../../containers/home/home'));
const AsyncItem = asyncComponent(() => import('../../containers/item-page/item'));
const AsyncCreateItem = asyncComponent(() => import('../../containers/createItem/createItem'));

export default ({ childProps }) =>
    <Switch>
        <Route exact path='/' exec component={AsyncHome}/>
        <Route exact path='/products/:productId' exec component={AsyncItem}/>
        <Route exact path='/create-item' exec component={AsyncCreateItem}/>
        <Route component={AsyncHome} />
    </Switch>
;