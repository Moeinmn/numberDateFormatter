const { parseNumber } = require("./numberFormatter/numberParser");
const { parseDateTime } = require("./dataFormatter/dateParser");
const { getRadixCharacter } = require("./numberFormatter/getRadixCharacter");
const { checkDayIsAtFirst } = require("./dataFormatter/dateParser");
//
// var numberPatternDic = {
//   "1245657": { SIChar: '', decimalSeparator: '', thousandsSeparator: '' },
//   "1,234,567": { SIChar: '', decimalSeparator: '', thousandsSeparator: ',' },
//   "1.234.567": { SIChar: '', decimalSeparator: '', thousandsSeparator: '.' },
//   "1'234'567": { SIChar: '', decimalSeparator: '', thousandsSeparator: "'" },
//   "12,345.67": { SIChar: "", decimalSeparator: ".", thousandsSeparator: "," },
//   "12 345.67": { SIChar: "", decimalSeparator: ".", thousandsSeparator: " " },
//   "12.345,67": { SIChar: "", decimalSeparator: ",", thousandsSeparator: "." },
//   "12 345,67": { SIChar: "", decimalSeparator: ",", thousandsSeparator: " " },
//   "12345.67": { SIChar: "", decimalSeparator: ".", thousandsSeparator: "" },
//   "12.345,67": { SIChar: "", decimalSeparator: ",", thousandsSeparator: "." },
//   "12345,67": { SIChar: "", decimalSeparator: ",", thousandsSeparator: "" },
//   "12'345.67" :{ SIChar: '', decimalSeparator: '.', thousandsSeparator: "'" },
//   "12'345,67": { SIChar: '', decimalSeparator: ',', thousandsSeparator: "'" },
//   "1234567a": { SIChar: "k", decimalSeparator: "", thousandsSeparator: "" },
//   "1,234,567a": { SIChar: "k", decimalSeparator: "", thousandsSeparator: "," },
//   "1.234.567a": { SIChar: "k", decimalSeparator: "", thousandsSeparator: "." },
//   "1'234'567a": { SIChar: "k", decimalSeparator: "", thousandsSeparator: "'" },
//   "12,345.67a": { SIChar: "k", decimalSeparator: ".", thousandsSeparator: "," },
//   "12 345.67a": { SIChar: "k", decimalSeparator: ".", thousandsSeparator: " " },
//   "12.345,67a": { SIChar: "k", decimalSeparator: ",", thousandsSeparator: "." },
//   "12 345,67a": { SIChar: "k", decimalSeparator: ",", thousandsSeparator: " " },
//   "12345.67a": { SIChar: "k", decimalSeparator: ".", thousandsSeparator: "" },
//   "12.345,67a": { SIChar: "k", decimalSeparator: ",", thousandsSeparator: "." },
//   "12345,67a": { SIChar: "k", decimalSeparator: ",", thousandsSeparator: "" },
//   "12'345.67a" :{ SIChar: 'k', decimalSeparator: '.', thousandsSeparator: "'" },
//   "12'345,67": { SIChar: 'k', decimalSeparator: ',', thousandsSeparator: "'" },
// };

var numberPatternDic = {
  withoutSI:{
    "1245657": { SIChar: '', decimalSeparator: '', thousandsSeparator: '' },
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
  },
  withSI:{
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
  }

};
//to finde pattern with object in may dic
function findKeyByValue(obj, value) {
 value["SIChar"] !== ""?value["SIChar"]="k":value
  return Object.keys(obj).find(
    (key) => JSON.stringify(obj[key]) === JSON.stringify(value)
  );
}

const hasValidFloatChars = (input) => {
  let isValid = false;
  for (let index = 0; index < input.length; index++) {
    const element = input[index];

    //NOTE: element !== " " has been removed because bug relateed to "2.1 kg"
    if (element !== "." && element !== "," && element !== "'" && element !== " ") {
      continue;
    }

    const prev = input?.[index - 1];
    const next = input?.[index + 1];

    if (prev && next) {
      if (prev.match(/([0-9])/g) && next.match(/([0-9])/g)) {
        isValid = true;
      } else {
        isValid = false;
        break;
      }
    }
  }

  return isValid;
};
const hasValidSpecialChars = (input) => {
  let isValid = false;

  if (input.match(/([%$€Є])/g)?.length === 1) {
    let strWithoutSpecialChar = input.replace(/([%$€Є])/g, "");
    //Should not include alphabetics and other special chars
    if (!strWithoutSpecialChar.match(/([A-Za-z@#])/g)) {
      return (isValid = true);
    }
  }
  return isValid;
};
const checkForSI = (input) => {
  let isValid = false;

  if (input.match(/([a-zA-Z])/g)?.length <= 1) {
    let match = /(k|K|M|m|t|T|b|B)/g.exec(input);
    if (match) {
      let stringAfterSIChar = input.slice(match.index + 1);

      if (stringAfterSIChar === "") return (isValid = true);

      if (!stringAfterSIChar.match(/[0-9]/g)) {
        isValid = true;
      }
    }
  }

  return isValid;
};

/**
 * @param {string} input - A string param
 * @return {'number' | 'date' | 'string'}
 */
const getType = (input) => {
  input=`${input}`
  //for handle null parameter
  if (input === null) {
    return "string";
  }

  //
  input = input?.trim?.();

  //for 12.05.2022 format
  if (
    input.split(".").length == 3 &&
    input.split(".")[0] <= 31 &&
    input.split(".")[1] <= 12 &&
    //This condition is for handling 9.012.345,00 format
    input.split(".")[2]?.length === 4
  ) {
    return "date";
  }

  if (input === "") {
    return "string";
  }

  if (
    !isNaN(Number(input)) &&
    //substracting 1500 - 2100 numbers for year
    !(
      Number.isInteger(Number(input)) &&
      Number(input) < 2100 &&
      Number(input) > 1500
    )
  ) {
    return "number";
  }

  if (
    checkForSI(input) ||
    //Special chars
    hasValidSpecialChars(input) ||
    hasValidFloatChars(input) ||
    (input.match(/[ ]/g) &&
      input.match(/[a-zA-Z]/g)?.length <= 1 &&
      input.match(/(k|K|M|m|t|T|b|B)/g))
  ) {
    if (input.match(/[a-zA-Z]/g)?.length > 1) {
      return "string";
    }
    //Parse number
    if (
      (!isNaN(parseNumber(input)?.pureNumber) &&
        parseNumber(input)?.pureNumber !== "Not a number") ||
      (!isNaN(parseNumber(input, { radixCharacter: "," })?.pureNumber) &&
        parseNumber(input)?.pureNumber !== "Not a number")
    ) {
      return "number";
    }
  }
  if (
    new Date(parseDateTime(input).ISODate)?.toString() !== "Invalid Date" ||
    new Date(
      parseDateTime(input, { dayIsAtFirst: true })?.ISODate
    )?.toString() !== "Invalid Date"
  ) {
    return "date";
  }
  return "string";
};

/**
 * @param {object[]} mainArr - dataset
 * @param {string[]} columnsArray - columns
 * @return {object}
 */
// const getColumnsType = (mainArr, columnsArray) => {
//   let columnsType = [];

//   for (let i = 0; i < columnsArray.length; i++) {
//     let column = mainArr[0][columnsArray[i]];

//     switch (getType(column)) {
//       case "number":
//         columnsType.push("number");
//         break;
//       case "date":
//         columnsType.push("date");
//         break;
//       case "string":
//         columnsType.push("string");
//         break;
//     }
//   }
//   return columnsType;
// };
///for date pattern
function findMostFrequentElement(arr) {
  let count = {};
  let maxCount = 0;
  let mostFrequentElement = null;

  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    count[element] = (count[element] || 0) + 1;

    if (count[element] > maxCount) {
      maxCount = count[element];
      mostFrequentElement = element;
    }
  }

  return mostFrequentElement;
}
//for number pattern
function findMostFrequentObject(arr) {
  // console.log(arr)
  let count = {};
  let maxCount = 0;
  let mostFrequentObject = null;

  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i];
    let key = JSON.stringify(obj);
    count[key] = (count[key] || 0) + 1;

    if (count[key] > maxCount) {
      maxCount = count[key];
      mostFrequentObject = obj;
    }
  }

  return mostFrequentObject;
}

const getColumnsType = (columnsArray,mainArr ) => {
  let columnsTypeAll = [];
  let columnsType = [];

  for (let i = 0; i < columnsArray.length; i++) {
    let arrayColumnsType = [];

    for (let j = 0; j < (mainArr.length >= 10 ? 10 : mainArr.length); j++) {
      let columnValue = mainArr[j][columnsArray[i]];

       // Ignore certain values
       if (columnValue === "" || columnValue === "*" || columnValue === "-") {
        continue;
      }


      switch (getType(columnValue)) {
        case "number":
          arrayColumnsType.push("number");

          break;
        case "date":
          arrayColumnsType.push("date");

          break;
        case "string":
          arrayColumnsType.push("string");
          break;
      }
    }
    //FOR FINDE SINGLE TYPE FOR EACH COLUMNS
    arrayColumnsType = Array.from(new Set(arrayColumnsType));
    // console.log(arrayColumnsType)
    arrayColumnsType.length >= 2
      ? columnsType.push("string")
      : columnsType.push(arrayColumnsType[0]);
    ///
  }
  // console.log(columnsType,"columnsType");

  let pattern = {};
  columnsType.forEach((element, Index) => {
    let targetIndex = mainArr.length;

    if (element === "number") {
      let arrayData = [];
      for (let index = 0; index < targetIndex; index++) {
        arrayData.push(mainArr[index][columnsArray[Index]]);
      }

      pattern[columnsArray[Index] + Index] = getRadixCharacter(arrayData);
    }
    if (element === "date") {
      let arrayData = [];
      for (let index = 0; index < targetIndex; index++) {
        arrayData.push(mainArr[index][columnsArray[Index]]);
      }

      pattern[columnsArray[Index] + Index] = checkDayIsAtFirst(arrayData);
    }
  });
  // console.log(pattern,"pattern");
  //for finde pattern of each columns
  for (let i = 0; i < columnsArray.length; i++) {
    let arrayColumnsFormat = [];

    for (let j = 0; j < (mainArr.length >= 10 ? 10 : mainArr.length); j++) {
      let columnValue = mainArr[j][columnsArray[i]];

      switch (columnsType[i]) {
        case "number":
          arrayColumnsFormat.push(
            parseNumber(columnValue, {
              radixCharacter: pattern[columnsArray[i] + i],
            }).format
          );
          break;
        case "date":
          arrayColumnsFormat.push(
            parseDateTime(columnValue, pattern[columnsArray[i] + i]).format
          );
          break;
        case "string":
          arrayColumnsFormat.push("");
          break;
      }
    }
    // console.log(arrayColumnsFormat);
    if (columnsType[i] === "date") {
      columnsTypeAll.push({
        colName:columnsArray[i],
        colType: "date",
        inputFormat: findMostFrequentElement(arrayColumnsFormat),
        outputFormat:"",
        colPrefix: "",
        colSuffix: "",
        overwrite: false,
      });
    } else if (columnsType[i] === "number") {
      columnsTypeAll.push({
        colName:columnsArray[i],
        colType: "number",
        inputFormat: findKeyByValue(
          numberPatternDic,
          findMostFrequentObject(arrayColumnsFormat)
        ),
        outputFormat:"",
        colPrefix: "",
        colSuffix: "",
        overwrite: false,
      });
    } else if (columnsType[i] === "string") {
      columnsTypeAll.push({
        colName:columnsArray[i],
        colType: "string",
        inputFormat: "",
        outputFormat:"",
        colPrefix: "",
        colSuffix: "",
        overwrite: false,
      });
    }
  }
  return columnsTypeAll;
};

const getColumnsTypeGridNew = (headerNormalized,mainArr) => {
  let columnsTypeAll = [];
  let columnsType = [];


///1.for calculate array of type each columns

  for (let i = 0; i <headerNormalized.length ; i++) {
    let arrayColumnsType = [];

    for (let j = 0; j < (mainArr.length >= 10 ? 10 : (mainArr.length)); j++) {
      let columnValue = mainArr[j][i];


       // Ignore certain values
      if (columnValue === "" || columnValue === "*" || columnValue === "-") {
        continue;
      }
      
      
      
      try{
        switch (getType(columnValue)) {
          case "number":
            arrayColumnsType.push("number");
  
            break;
          case "date":
            arrayColumnsType.push("date");
  
            break;
          case "string":
            arrayColumnsType.push("string");
            break;
        }
      }catch (error) {
        arrayColumnsType.push("string"); // Assign "string" type when an error occurs
      }
  
    }
    //(FOR FINDE SINGLE TYPE FOR EACH COLUMNS)
    console.log(arrayColumnsType);
    arrayColumnsType = Array.from(new Set(arrayColumnsType));
    arrayColumnsType.length >= 2
    ? columnsType.push("string")
    : columnsType.push(arrayColumnsType[0]);
    //
  }
  

  

  ///1.end of the step 1 and have array of type each columns =>["number","number","string",.....]

// console.log(columnsType);

//   ///2.calculate patern for each columns for need to praser
  let pattern = {};
  columnsType.forEach((element, Index) => {
    let targetIndex = mainArr.length;

    if (element === "number") {
      let arrayData = [];
      for (let index = 0; index < targetIndex; index++) {
        arrayData.push(mainArr[index][Index]);
      }
      try{
        pattern[headerNormalized[Index] + Index] = getRadixCharacter(arrayData);

      }catch(error){
        columnsType[Index]="string"
      }
  
      // console.log(arrayData);
    }
    if (element === "date") {
      let arrayData = [];
      for (let index = 0; index < targetIndex; index++) {
        arrayData.push(mainArr[index][Index]);
      }

      try{
        pattern[headerNormalized[Index] + Index] = checkDayIsAtFirst(arrayData);

      }catch(error){
        columnsType[Index]="string"
      }

    }
  });

// //   ///2.end of step 2 and calculate pattarn for columns have type number and data 



// // //  ///3.calculate inputpattern of parser for each columns with parser
  for (let i = 0; i <headerNormalized.length; i++) {
    let arrayColumnsFormat = [];

    for (let j = 0; j < (mainArr.length >= 10 ? 10 : (mainArr.length)); j++) {
      let columnValue = mainArr[j][i];

      try{
        
      switch (columnsType[i]) {
        case "number":
          arrayColumnsFormat.push(
            parseNumber(columnValue, {
              radixCharacter: pattern[headerNormalized[i] + i],
            }).format
          );
          break;
        case "date":
          arrayColumnsFormat.push(
            parseDateTime(columnValue,{ dayIsAtFirst:  pattern[headerNormalized[i] + i]}).format
          );
          break;
        case "string":
          arrayColumnsFormat.push("");
          break;
      }
      }catch(error){
        columnsType[i]="string"
        break;
      }

    }
    // console.log(pattern);
    if (columnsType[i] === "date") {
      columnsTypeAll.push({
        colName:headerNormalized[i],
        colType: "date",
        inputFormat: findMostFrequentElement(arrayColumnsFormat),
        outputFormat:"",
        colPrefix: "",
        colSuffix: "",
        overwrite: false,

      });
    } else if (columnsType[i] === "number") {
      // console.log(findMostFrequentObject(arrayColumnsFormat),headerNormalized[i])
      columnsTypeAll.push({
        colName:headerNormalized[i],
        colType: "number",
        inputFormat:
        findMostFrequentObject(arrayColumnsFormat)["SIChar"] !== ""?
         findKeyByValue(
                numberPatternDic["withSI"],
                findMostFrequentObject(arrayColumnsFormat)
              ): findKeyByValue(
                numberPatternDic["withoutSI"],
                findMostFrequentObject(arrayColumnsFormat)
              ),
          outputFormat:"",
          colPrefix: "",
          colSuffix: "",
          overwrite: false,
      });
    } else if (columnsType[i] === "string") {
      columnsTypeAll.push({
        colName:headerNormalized[i],
        colType: "string",
        inputFormat: "",
        outputFormat:"",
        colPrefix: "",
        colSuffix: "",
        overwrite: false,
      });
    }
  }
//   ///end of step 3 and have array of object 

  return columnsTypeAll;
};


let data=[
  ["","789.12","2,345.67","500","3,000.25","2,000.10","1,000.50","1.234,56","789,12","2.345,67"],
  ["2,345.67","1,234.56","789.12","1,000","2,500.75","4,000.20","1,500.75","2,345.67","1,234.56","789.12"],
  ["789.12","2,345.67","1,234.56","2,500","1,500.35","3,500.60","2,000.40","789,12","2,345,67","1.234,56"],
  ["1,234.56","789.12","2,345.67","3,500","4,000.50","1,000.90","3,000.85","1,234.56","789.12","2,345.67"],
  ["2,345.67","1,234.56","789.12","1,200","2,000.75","1,500.80","4,000.60","2,345.67","1,234.56","789.12"],
  ["789.12","2,345.67","1,234.56","4,000","3,500.45","2,500.30","1,500.90","789,12","2,345,67","1.234,56"],
  ["1,234.56","789.12","2,345.67","2,300","1,200.65","3,000.40","4,000.70","1,234.56","789.12","2,345.67"]
]



 
//  console.log(getColumnsTypeGridNew(    ["Column 1","Column 2","Column 3","Column 4","Column 5","Column 6","Column 7","Bad Column 1","Bad Column 2","Bad Column 3"],data));


const getColumnsTypeGrid = (mainArr) => {
  let columnsType = [];
  for (let i = 0; i < mainArr[1].length; i++) {
    let column = mainArr[1][i];

    switch (getType(column)) {
      case "number":
        columnsType.push("number");
        break;
      case "date":
        columnsType.push("date");
        break;
      case "string":
        columnsType.push("string");
        break;
    }
  }
  return columnsType;
};
const getColumnsTypeClient = (mainArr, columnsArray) => {
  let columnsType = {};

  for (let i = 0; i < columnsArray.length; i++) {
    let column = mainArr[0][columnsArray[i]];

    switch (getType(column)) {
      case "number":
        // columnsType.push("number");
        columnsType[columnsArray[i]] = "number";
        break;
      case "date":
        // columnsType.push("date");
        columnsType[columnsArray[i]] = "date";
        break;
      case "string":
        // columnsType.push("string");
        columnsType[columnsArray[i]] = "strings";

        break;
    }
  }
  return columnsType;
};



module.exports = {
  getType,
  getColumnsType,
  getColumnsTypeClient,
  getColumnsTypeGrid,
  getColumnsTypeGridNew,
};
