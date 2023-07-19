const { format } = require("date-fns");

const dateFormatter = (date, pattern) => {
  let converted = new Date(date);
  let formattedDate = format(converted, pattern).toString();

  return formattedDate;
};

module.exports = { dateFormatter };
