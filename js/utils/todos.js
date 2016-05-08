const dateFormat = require('dateformat');

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const simpleFormatDate = (date) => {
  if (date) {
    return dateFormat(date, 'ddd, mmm d');
  }
};

const formatDate = (date) => {
  if (date) {
    const now = new Date().getTime();
    const ms = now - new Date(date).getTime();
    const text = simpleFormatDate(date);

    if (ms > 0 && ms < MS_PER_DAY) {
      return text + ' (Today)';
    } else if (ms > 0 && ms < (2 * MS_PER_DAY)) {
      return text + ' (Yesterday)';
    }
    return text;
  }
};

// extract only the date part
const toDate = (date) => {
  if (date) {
    const d = new Date(date); // ensure it's a Date type
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }
};

const archivedTodos = (todos) => todos.filter((t) => t.archivedAt);
const unarchivedTodos = (todos) => todos.filter((t) => !t.archivedAt);
const completedTodos = (todos) => todos.filter((t) => t.completedAt);

const addedAtDate = (todo) => toDate(todo.addedAt);
const completedAtDate = (todo) => toDate(todo.completedAt);

export { MS_PER_DAY, formatDate, simpleFormatDate, archivedTodos, unarchivedTodos, completedTodos, addedAtDate, completedAtDate };
