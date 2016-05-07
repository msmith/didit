const dateFormat = require('dateformat');

const formatDate = (date) => dateFormat(date, 'ddd, mmm d');

// extract only the date part
const toDate = (date) => {
  if (date) {
    const d = new Date(date); // ensure it's a Date type
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
};

export { formatDate, toDate };