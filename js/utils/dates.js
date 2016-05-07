const dateFormat = require('dateformat');

const formatDate = (date) => dateFormat(date, 'ddd, mmm d');

// extract only the date part
const toDate = (date) => {
  if (date) {
    const d = new Date(date); // ensure it's a Date type
    // XXX - this returns a string rather than a Date because lodash.groupBy
    //       will convert it to a string, and Date#toString() won't sort properly.
    // TODO - don't use lodash.groupBy in TodoGroups
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
  }
};

export { formatDate, toDate };
