import { toDate } from './dates';

const archivedTodos = (todos) => todos.filter((t) => t.archivedAt);
const unarchivedTodos = (todos) => todos.filter((t) => !t.archivedAt);

const addedAtDate = (todo) => toDate(todo.addedAt);
const completedAtDate = (todo) => toDate(todo.completedAt);

export { archivedTodos, unarchivedTodos, addedAtDate, completedAtDate };
