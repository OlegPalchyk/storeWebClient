import React, { Component } from 'react';
import Routes from './routes';

import {Provider} from "react-redux";
import configureStore from "../../store/store";

let store = configureStore();


class Main extends Component {
  render() {
    return (
        <Provider store={store}>
            <Routes/>
        </Provider>
    );
  }
}

export default Main;
