const numeral = require("numeral");
const { format } = require("date-fns");

const dateFormatter = (date, pattern) => {
  let converted = new Date(date);
  let formattedDate = format(converted, pattern).toString();

  return formattedDate;
};

const customFormatter = (data, colsDataFormat) => {
  if (colsDataFormat.length == 0) return;
  colsDataFormat.forEach((e) => {
    for (let index = 0; index < data.length; index++) {
      switch (e.colType) {
        case "number":
          data[index][e.colName] =
            e.colPrefix +
            numeral(+data[index][e.colName]).format(e.colFormat) +
            e.colSuffix;
          break;
        case "date":
          data[index][e.colName] = dateFormatter(
            data[index][e.colName],
            e.colFormat
          );
      }
    }
  });
  return data;
};

let example = [
  {
    colName: "date",
    colType: "date",
    colFormat: "dd-MMM-yy",
    colPrefix: "",
    colSuffix: "",
  },
  {
    colName: "price",
    colType: "number",
    colFormat: "0.00",
    colPrefix: "$",
    colSuffix: "",
  },
];

let data = [
  {
    date: "2023-05-15T00:00:00.000Z",
    name: "mahdiyar",
    price: "2000",
  },

  {
    date: "1985-01-01T00:00:00.000Z",
    name: "moein",
    price: "1500",
  },
  {
    date: "1972-01-01T00:00:00.000Z",
    name: "soheil",
    price: "1000",
  },
];
// console.log(customFormatter(data, example));

module.exports = { customFormatter };
