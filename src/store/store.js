import {createStore,applyMiddleware} from 'redux';
import {Reducers} from '../reducers/Reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();
export default function(){
  var store = createStore(Reducers, applyMiddleware(logger,thunk));
  return store;
}
