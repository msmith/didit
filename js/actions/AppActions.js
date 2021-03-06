/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return (dispatch) => {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        };
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */

import { ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, UPDATE_TODO, DELETE_TODO, ARCHIVE_TODOS, TOGGLE_DEBUG } from '../constants/AppConstants';

export function asyncAddTodoItem(id, text, addedAt) {
  return (dispatch) => {
    return dispatch(addTodoItem(id, text, addedAt));
  };
}

export function asyncCompleteTodoItem(id, completedAt) {
  return (dispatch) => {
    return dispatch(completeTodoItem(id, completedAt));
  };
}

export function asyncUncompleteTodoItem(id) {
  return (dispatch) => {
    return dispatch(uncompleteTodoItem(id));
  };
}

export function asyncDeleteTodoItem(id) {
  return (dispatch) => {
    return dispatch(deleteTodoItem(id));
  };
}

export function addTodoItem(id, text, addedAt = new Date()) {
  return { type: ADD_TODO, id, text, addedAt };
}

export function completeTodoItem(id, completedAt = new Date()) {
  return { type: COMPLETE_TODO, id, completedAt };
}

export function uncompleteTodoItem(id) {
  return { type: UNCOMPLETE_TODO, id };
}

export function updateTodoItem(id, addedAt) {
  return { type: UPDATE_TODO, id, addedAt };
}

export function deleteTodoItem(id) {
  return { type: DELETE_TODO, id };
}

export function archiveTodoItems(archivedAt = new Date()) {
  return { type: ARCHIVE_TODOS, archivedAt };
}

export function toggleDebug() {
  return { type: TOGGLE_DEBUG };
}
