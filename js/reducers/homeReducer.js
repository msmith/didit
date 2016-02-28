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

import { ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, MOVE_TODO, REMOVE_TODO, ARCHIVE_TODOS } from '../constants/AppConstants';
import { assignToEmpty, modifyItemInList } from '../utils/assign';
var lodash = require('lodash');

const initialState = {
  todos: []
};

const withId = (id) => (t) => id === t.id;

const modifyTodoItem = (state, id, newObject) => {
  return assignToEmpty(state, {
    todos: modifyItemInList(state.todos, withId(id), newObject)
  });
};

const findIndex = (todos, id) => {
  for (var index = 0; index < todos.length; index++) {
    if (todos[index].id === id) {
      return index;
    }
  }
  return null;
}

function homeReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case ADD_TODO:
      const todos = [
        ...state.todos,
        {
          id: action.id,
          text: action.text,
          addedAt: action.addedAt,
          completedAt: undefined
        }
      ];
      return assignToEmpty(state, {
        todos: todos
      });
    case COMPLETE_TODO:
      return modifyTodoItem(state, action.id, {
        completedAt: action.completedAt
      });
    case UNCOMPLETE_TODO:
      return modifyTodoItem(state, action.id, {
        completedAt: undefined
      });
    case MOVE_TODO:
      return modifyTodoItem(state, action.id, {
        addedAt: action.addedAt
      });
    case REMOVE_TODO:
      const index = findIndex(state.todos, action.id);
      if (index == null) {
        return state;
      } else {
        const ts = [
          ...state.todos.slice(0, index),
          ...state.todos.slice(index + 1)
        ];
        return assignToEmpty(state, {
          todos: ts
        });
      }
    case ARCHIVE_TODOS:
      const incompleteTodos = lodash.reject(state.todos, 'completedAt')
      return assignToEmpty(state, {
        todos: incompleteTodos
      });
    default:
      return state;
  }
}

export default homeReducer;
