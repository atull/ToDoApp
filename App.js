/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Router from 'src/Router';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import reducers from 'src/core/redux/reducers';

const store = createStore(reducers);
const persistor = persistStore(store)

export default class App extends Component<Props> {
  componentWillUnmount() {
    persistor.flush();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}
