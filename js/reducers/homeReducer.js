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

import { ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, MOVE_TODO, REMOVE_TODO, ARCHIVE_TODOS, TOGGLE_DEBUG } from '../constants/AppConstants';
import { assignToEmpty, modifyItemInList } from '../utils/assign';
const lodash = require('lodash');

const initialState = {
  todos: [],
  debug: false
};

const withId = (id) => (t) => id === t.id;

const modifyTodoItem = (state, id, newObject) => {
  return assignToEmpty(state, {
    todos: modifyItemInList(state.todos, withId(id), newObject)
  });
};

const removeTodos = (todos, predicate) => lodash.reject(todos, predicate);

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
      return assignToEmpty(state, {
        todos: removeTodos(state.todos, withId(action.id))
      });
    case ARCHIVE_TODOS:
      var newTodos = state.todos;
      for (var t of newTodos) {
        if (t.completedAt && !t.archivedAt) {
          newTodos = modifyItemInList(newTodos, withId(t.id), {
            archivedAt: action.archivedAt
          })
        }
      }
      return assignToEmpty(state, {
        todos: newTodos
      });
    case TOGGLE_DEBUG:
      return assignToEmpty(state, {
        debug: !state.debug
      });
    default:
      return state;
  }
}

export default homeReducer;
