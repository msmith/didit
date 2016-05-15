/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import todosReducer from './todosReducer';
import debugReducer from './debugReducer';

import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  todos: todosReducer,
  debug: debugReducer
});

export default rootReducer;
