const {
  parseDateTime,
  checkDayIsAtFirst,
} = require("./utils/dataFormatter/dateParser");
const {
  getType,
  getColumnsType,
  getColumnsTypeClient,
  getColumnsTypeGrid,
  getColumnsTypeGridNew,
} = require("./utils/getColumnsType");
const {
  getRadixCharacter,
} = require("./utils/numberFormatter/getRadixCharacter");
const { parseNumber } = require("./utils/numberFormatter/numberParser");
const { autoForamtter,customFormatter } = require("./utils/autoFormatter");
const {backupDataMap}=require("./utils/backupDataMap")
//  const {customFormatter}=require("")

const { Parser } = require("./utils/Parser");
var pjson = require("./package.json");
let splited = pjson.version.split(".");
splited[2]++;
let formatterVersion = splited.join(".");

// console.log(getColumnsTypeGrid([["age", "name"],["12", "amir"], ["15", "ali"]]))

// console.log(getColumnsTypeGridNew([["name","age","born"],["mahdiyar","25.2","2019-05-01"],["moein","18.25","2019-05-05"],["soheil","23.2","2019-06-01"]]))
// console.log(parseDateTime(
//   "2023-03-15",
//   { customFormat:'MM-dd-yyyy' },
//   true
// ))
// console.log(parseNumber("$1,200,000.50", "."), "test");
// console.log(getRadixCharacter([
//   '1.000.000,000', '1,000,000.000'
// ]));

// console.log(parseDateTime(parseDateTime(
//   { customFormat: element.inputFormat },
//   true
// )))
// console.log(parseNumber(
//   "1,234.56K",
//   { customFormat:  { SIChar: 'mM', decimalSeparator: '.', thousandsSeparator: '.' } },
//   true
// ))

module.exports = {
  parseDateTime,
  checkDayIsAtFirst,
  getType,
  getColumnsType,
  getColumnsTypeClient,
  getRadixCharacter,
  parseNumber,
  Parser,
  formatterVersion,
  getColumnsTypeGrid,
  autoForamtter,
  getColumnsTypeGridNew,
  backupDataMap,
  customFormatter
};
