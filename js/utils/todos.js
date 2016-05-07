const lodash = require('lodash');

const archivedTodos = (todos) => lodash.filter(todos, (t) => t.archivedAt);
const unarchivedTodos = (todos) => lodash.reject(todos, (t) => t.archivedAt);

export { archivedTodos, unarchivedTodos };
