const dateFormat = require('dateformat');

const formatDate = (date) => dateFormat(date, 'ddd, mmm d');

// extract only the date part
const toDate = (date) => {
  if (date) {
    const d = new Date(date); // ensure it's a Date type
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }
};

const archivedTodos = (todos) => todos.filter((t) => t.archivedAt);
const unarchivedTodos = (todos) => todos.filter((t) => !t.archivedAt);

const addedAtDate = (todo) => toDate(todo.addedAt);
const completedAtDate = (todo) => toDate(todo.completedAt);

export { formatDate, archivedTodos, unarchivedTodos, addedAtDate, completedAtDate };
