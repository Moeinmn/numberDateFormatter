const numeral = require("numeral");

const numberFormatter = (number, pattern) => {
  const result = numeral(number).format(pattern);

  return result;
};

module.exports = { numberFormatter };
