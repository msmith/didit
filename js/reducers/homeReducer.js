/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */

import { ADD_TODO } from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

const initialState = {
  todos: []
};

function homeReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case ADD_TODO:
      const todos = [
        ...state.todos,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
      return assignToEmpty(state, {
        todos: todos
      });
    default:
      return state;
  }
}

export default homeReducer;
