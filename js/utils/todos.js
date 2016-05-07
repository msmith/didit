import { toDate } from './dates';

const lodash = require('lodash');

const archivedTodos = (todos) => lodash.filter(todos, (t) => t.archivedAt);
const unarchivedTodos = (todos) => lodash.reject(todos, (t) => t.archivedAt);

const addedAtDate = (todo) => toDate(todo.addedAt);
const completedAtDate = (todo) => toDate(todo.completedAt);

export { archivedTodos, unarchivedTodos, addedAtDate, completedAtDate };
