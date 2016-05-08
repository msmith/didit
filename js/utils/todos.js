const dateFormat = require('dateformat');

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Add or subtract X days from the given date
const addDays = (date, days) => new Date(new Date(date).getTime() + days * MS_PER_DAY);

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

const groupForDate = (dateOrTime, fallback = 'Incomplete') => {
  if (dateOrTime) {
    const now = new Date();
    const date = new Date(dateOrTime);
    const ms = now.getTime() - new Date(date).getTime();

    if (ms < 0) {
      return simpleFormatDate(date);
    } else if (ms < MS_PER_DAY) {
      return 'Today';
    } else if (ms < (2 * MS_PER_DAY)) {
      return 'Yesterday';
    }

    if (date.getYear() === now.getYear()) {
      if (date.getMonth() === now.getMonth()) {
        return 'This month';
      }

      return dateFormat(date, 'mmmm');
    }

    return dateFormat(date, 'mmmm yyyy');
  }
  return fallback;
};

const archivedTodos = (todos) => todos.filter((t) => t.archivedAt);
const unarchivedTodos = (todos) => todos.filter((t) => !t.archivedAt);
const completedTodos = (todos) => todos.filter((t) => t.completedAt);

export {
  MS_PER_DAY,
  addDays,

  formatDate,
  simpleFormatDate,

  groupForDate,

  archivedTodos,
  unarchivedTodos,
  completedTodos,
};
