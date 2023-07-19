/**
 * Creates a function that parses columns in a 2-dimensional array.
 * @param {Function} formatRecognizer - A function that recognizes the format of the data in a column.
 * @param {Function} parser - A function that parses the data in a column based on its format.
 * @returns {Function} A function that takes two arguments: mainArr and columnArr.
 * The function uses the formatRecognizer function to determine the format of the data in each column,
 * and the parser function to parse the data in each column based on its format.
 * The parsed data is stored in the mainArr.
 */
const createColumnParser = (formatRecognizer, parser) => {
  return function (mainArr, columnArr) {
    let pattern = {};
    columnArr.forEach((e) => {
      let arrayData = [];

      let targetIndex = mainArr.length < 5 ? mainArr.length : 5;
      for (let index = 0; index < targetIndex; index++) {
        arrayData.push(mainArr[index][e]);
      }
      pattern[e] = formatRecognizer(arrayData);
    });

    for (let index = 0; index < mainArr.length; index++) {
      columnArr.forEach((e) => {
        mainArr[index][e] = parser(mainArr[index][e], pattern[e], true);
      });
    }
  };
};

module.exports = { createColumnParser };
