const dateFormat = require('dateformat');

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Add or subtract X days from the given date
const addDays = (date, days) => new Date(new Date(date).getTime() + days * MS_PER_DAY);

const simpleFormatDate = (date) => {
  if (date) {
    return dateFormat(date, 'ddd, mmm d');
  }
};

const formatDate = (date, now = new Date()) => {
  if (date) {
    const nowInMs = now.getTime();
    const ms = nowInMs - new Date(date).getTime();
    const text = simpleFormatDate(date);

    if (ms > 0 && ms < MS_PER_DAY) {
      return text + ' (Today)';
    } else if (ms > 0 && ms < (2 * MS_PER_DAY)) {
      return text + ' (Yesterday)';
    }
    return text;
  }
};

const groupForDate = (dateOrTime, now = new Date()) => {
  if (dateOrTime) {
    const date = new Date(dateOrTime);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(startOfToday.getTime() + MS_PER_DAY);
    const startOfYesterday = new Date(startOfToday.getTime() - MS_PER_DAY);

    if (date >= startOfYesterday && date < startOfToday) {
      return 'Yesterday';
    } else if (date >= startOfToday && date < startOfTomorrow) {
      return 'Today';
    } else if (date >= startOfTomorrow) {
      return dateFormat(date, 'ddd, mmm d');
    }

    if (date.getYear() === now.getYear()) {
      if (date.getMonth() === now.getMonth()) {
        return 'This month';
      }

      return dateFormat(date, 'mmmm');
    }

    return dateFormat(date, 'mmmm yyyy');
  }
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
