import React, { Component } from 'react';
import {  Route, Switch } from 'react-router'
import Home from '../home/home';
import Item from '../item-page/item';
import CreateItem from '../createItem/createItem';
import {Provider} from "react-redux";
import configureStore from "../../store/store";

let store = configureStore();


class Main extends Component {
  render() {
    return (
        <Provider store={store}>
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route exact path='/products/:productId' component={Item}/>
                <Route exact path='/create-item' component={CreateItem}/>
            </Switch>
        </Provider>
    );
  }
}

export default Main;
