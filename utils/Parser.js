
const { parseNumber } = require("./numberFormatter/numberParser");
const { parseDateTime } = require("./dataFormatter/dateParser");

const Parser = (data, columnsType, columnCol) => {
  var numberPatternDic = {
    "124565": { SIChar: '', decimalSeparator: '', thousandsSeparator: '' },
    "1,234,567": { SIChar: '', decimalSeparator: '', thousandsSeparator: ',' },
    "1.234.567": { SIChar: '', decimalSeparator: '', thousandsSeparator: '.' },
    "1'234'567": { SIChar: '', decimalSeparator: '', thousandsSeparator: "'" },
    "12,345.67": { SIChar: "", decimalSeparator: ".", thousandsSeparator: "," },
    "12 345.67": { SIChar: "", decimalSeparator: ".", thousandsSeparator: " " },
    "12.345,67": { SIChar: "", decimalSeparator: ",", thousandsSeparator: "." },
    "12 345,67": { SIChar: "", decimalSeparator: ",", thousandsSeparator: " " },
    "12345.67": { SIChar: "", decimalSeparator: ".", thousandsSeparator: "" },
    "12.345,67": { SIChar: "", decimalSeparator: ",", thousandsSeparator: "." },
    "12345,67": { SIChar: "", decimalSeparator: ",", thousandsSeparator: "" },
    "12'345.67" :{ SIChar: '', decimalSeparator: '.', thousandsSeparator: "'" },
    "12'345,67": { SIChar: '', decimalSeparator: ',', thousandsSeparator: "'" },
    "1234567a": { SIChar: "k", decimalSeparator: "", thousandsSeparator: "" },
    "1,234,567a": { SIChar: "k", decimalSeparator: "", thousandsSeparator: "," },
    "1.234.567a": { SIChar: "k", decimalSeparator: "", thousandsSeparator: "." },
    "1'234'567a": { SIChar: "k", decimalSeparator: "", thousandsSeparator: "'" },
    "12,345.67a": { SIChar: "k", decimalSeparator: ".", thousandsSeparator: "," },
    "12 345.67a": { SIChar: "k", decimalSeparator: ".", thousandsSeparator: " " },
    "12.345,67a": { SIChar: "k", decimalSeparator: ",", thousandsSeparator: "." },
    "12 345,67a": { SIChar: "k", decimalSeparator: ",", thousandsSeparator: " " },
    "12345.67a": { SIChar: "k", decimalSeparator: ".", thousandsSeparator: "" },
    "12.345,67a": { SIChar: "k", decimalSeparator: ",", thousandsSeparator: "." },
    "12345,67a": { SIChar: "k", decimalSeparator: ",", thousandsSeparator: "" },
    "12'345.67a" :{ SIChar: 'k', decimalSeparator: '.', thousandsSeparator: "'" },
    "12'345,67": { SIChar: 'k', decimalSeparator: ',', thousandsSeparator: "'" },
  };


  for (let index = 0; index < data.length; index++) {

    columnsType.forEach((element, Index) => {
      if (element.colType === "string") {

        // Ignore certain values
        data[index][columnCol[Index]] =
          data[index][columnCol[Index]] === null || 
          data[index][columnCol[Index]] === ""   ||
          data[index][columnCol[Index]] === "*"  ||
          data[index][columnCol[Index]] === "-"
            ? ""
            : data[index][columnCol[Index]];
      }

      if (element.colType === "number") { 
        try{

           // Ignore certain values
          data[index][columnCol[Index]] =
          data[index][columnCol[Index]] === null  ||
          data[index][columnCol[Index]] === ""    ||
          data[index][columnCol[Index]] === "*"   ||
          data[index][columnCol[Index]] === "-"
            ? ""
            : parseNumber(
                data[index][columnCol[Index]],
                { customFormat: numberPatternDic[element.inputFormat] },
                true
              ).pureNumber;
            // console.log( data[index][columnCol[Index]]);

        }catch(error){
          element.colType ="string"
        }
   
      }
      if (element.colType === "date") {
        try{
          data[index][columnCol[Index]] =
          data[index][columnCol[Index]] === null  ||
          data[index][columnCol[Index]] === ""    ||
          data[index][columnCol[Index]] === "*"   ||
          data[index][columnCol[Index]] === "-"
            ? ""
            : parseDateTime(
                data[index][columnCol[Index]],
                { customFormat: element.inputFormat },
                true
              ).ISODate;
            // console.log( data[index][columnCol[Index]]);
        }catch(error){
          element.colType = "string"
          return
        }
      
      }
    });
  }
};



// let data=[
//   {
//       "Date": "01-07-2023",
//       "Comma Separator": "1,234.56",
//       "Period Separator": "1.234,56",
//       "Space Separator": "1 234.56",
//       "Apostrophe Separator": "1'234.56",
//       "No Separator": "1234.56"
//   },
//   {
//       "Date": "07-02-2023",
//       "Comma Separator": "7,890.12",
//       "Period Separator": "7.890,12",
//       "Space Separator": "7 890.12",
//       "Apostrophe Separator": "7'890.12",
//       "No Separator": "7890.12"
//   },
//   {
//       "Date": "2023-03-15",
//       "Comma Separator": "2,560.75",
//       "Period Separator": "2.560,75",
//       "Space Separator": "2 560.75",
//       "Apostrophe Separator": "2'560.75",
//       "No Separator": "2560.75"
//   },
//   {
//       "Date": "04-07-2023",
//       "Comma Separator": "3,145.88",
//       "Period Separator": "3.145,88",
//       "Space Separator": "3 145.88",
//       "Apostrophe Separator": "3'145.88",
//       "No Separator": "3145.88"
//   },
//   {
//       "Date": "07-05-2023",
//       "Comma Separator": "890.12",
//       "Period Separator": "890,12",
//       "Space Separator": "890.12",
//       "Apostrophe Separator": "890.12",
//       "No Separator": "890.12"
//   },
//   {
//       "Date": "2023-06-30",
//       "Comma Separator": "10,000.99",
//       "Period Separator": "10.000,99",
//       "Space Separator": "10 000.99",
//       "Apostrophe Separator": "10'000.99",
//       "No Separator": "10000.99"
//   },
//   {
//       "Date": "07-07-2023",
//       "Comma Separator": "6,660.25",
//       "Period Separator": "6.660,25",
//       "Space Separator": "6 660.25",
//       "Apostrophe Separator": "6'660.25",
//       "No Separator": "6660.25"
//   },
//   {
//       "Date": "2023-08-01",
//       "Comma Separator": "9,999.45",
//       "Period Separator": "9.999,45",
//       "Space Separator": "9 999.45",
//       "Apostrophe Separator": "9'999.45",
//       "No Separator": "9999.45"
//   },
//   {
//       "Date": "07-09-2023",
//       "Comma Separator": "456.78",
//       "Period Separator": "456,78",
//       "Space Separator": "456.78",
//       "Apostrophe Separator": "456.78",
//       "No Separator": "456.78"
//   }
// ]
// let columnType=[
//   {
//       "colName": "Date",
//       "colType": "date",
//       "inputFormat": "MM-dd-yyyy",
//       "outputFormat": "",
//       "colPrefix": "",
//       "colSuffix": "",
//       "overwrite": false
//   },
//   {
//       "colName": "Comma Separator",
//       "colType": "number",
//       "inputFormat": "12,345.67",
//       "outputFormat": "",
//       "colPrefix": "",
//       "colSuffix": "",
//       "overwrite": false
//   },
//   {
//       "colName": "Period Separator",
//       "colType": "number",
//       "inputFormat": "12.345,67",
//       "outputFormat": "",
//       "colPrefix": "",
//       "colSuffix": "",
//       "overwrite": false
//   },
//   {
//       "colName": "Space Separator",
//       "colType": "number",
//       "inputFormat": "12 345.67",
//       "outputFormat": "",
//       "colPrefix": "",
//       "colSuffix": "",
//       "overwrite": false
//   },
//   {
//       "colName": "Apostrophe Separator",
//       "colType": "number",
//       "inputFormat": "12'345.67",
//       "outputFormat": "",
//       "colPrefix": "",
//       "colSuffix": "",
//       "overwrite": false
//   },
//   {
//       "colName": "No Separator",
//       "colType": "number",
//       "inputFormat": "12345.67",
//       "outputFormat": "",
//       "colPrefix": "",
//       "colSuffix": "",
//       "overwrite": false
//   }
// ]

// let columns=['Date', 'Comma Separator', 'Period Separator', 'Space Separator',"Apostrophe Separator","No Separator"]

// Parser(data,columnType,columns);
// console.log(data);
// console.log(columnType);

module.exports = { Parser };
