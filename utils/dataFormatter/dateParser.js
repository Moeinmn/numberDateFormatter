const { parse } = require("date-fns");
let possibleInputs = [
  "1986-02-13T11:22:05.000Z",
  "1986-02-13",
  "02/11/1986",
  "30/02/22",
  "13-Feb-1986",
  "13-Feb-86",
  "02/1986",
  "02/86",
  "Feb 1986",
  "Feb 86",
  "Feb 13",
  "February 13",
  "13 Feb",
  "1986",
  "86",
  "February",
  "Feb",
  "December 5, 2001",
  "11:22:05",
  "11:22",
  "02-13-1986",
  "2/13",
  "02-13",
  "13-Feb",
  "13-Feb-1986",
  "February 13, 1986",
  "Feb-13",
  "Feb 13, 1986",
  "Thursday, February 13, 1986",
  "2020-02",
  "1/1/2020 10:16:27",
];

const createISOStr = (obj) => {
  return (
    obj.date.join("-") +
    obj.timeMarker +
    obj.time.join(":") +
    obj.seconds +
    obj.timeZoneOffset
  );
};
const isValidDate = (date) => {
  return new Date(date).toString() !== "Invalid Date";
};
const isNumber = (str) => !isNaN(Number(str));
const normalizeYear = (yearStr) => {
  if (!isNumber(yearStr)) {
    return ["null", "null"];
  }
  let strNumber = yearStr;
  let value = yearStr;
  let format = "yyyy";
  if (strNumber.length < 4) {
    format = "yy";
    if (Number(strNumber) < 50) {
      value = `20${normalizeNumber(strNumber)}`;
    }
    if (Number(strNumber) > 50) {
      value = `19${normalizeNumber(strNumber)}`;
    }
  }
  return [format, value];
};
const returnISOFormat = (dateStr) => {
  //Converting ISO and 1998-01-01 frmats
  if (
    (dateStr.match(/[\-]/g) || []).length > 1 &&
    dateStr.split("-")[0].length > 2
  ) {
    return new Date(dateStr).toISOString();
  }
  //Converting other formats
  let date = new Date(dateStr);

  let extraOffset = date.getFullYear() < 1936 ? -256_000 : 0;
  var userTimezoneOffset = date.getTimezoneOffset() * 60000 + extraOffset;
  let test = new Date(date.getTime() - userTimezoneOffset);
  return test.toISOString();
};
const normalizeNumber = (str) => `${Number(str) <= 9 ? "0" : ""}${Number(str)}`;

const isTime = (param) =>
  param.indexOf(":") <= 3 && param.indexOf(":") !== -1 ? true : false;

const normalizeTime = (time) => {
  let offset = 0;

  if (time.match(/(pm)/gi)) {
    offset = 12;
  }

  let normalizedTime = time.replace(/([^(0-9):])/g, "");

  return [offset, normalizedTime];
};

const normalizeDate = (str) => {
  let charsMatched = str.match(/[ .\-\/]/g);
  let normalizedStr = str.replace(/[ .\-\/]/g, "-");
  return [charsMatched, normalizedStr];
};

const findMonthSequence = (month) => {
  let monthNames = [
    "Jan(?:uary)?",
    "Feb(?:ruary)?",
    "Mar(?:ch)?",
    "Apr(?:il)?",
    "May",
    "Jun(?:e)?",
    "Jul(?:y)?",
    "Aug(?:ust)?",
    "Sep(?:tember)?",
    "Oct(?:ober)?",
    "Nov(?:ember)?",
    "Dec(?:ember)?",
  ];

  let monthSequence = 0;

  for (let i = 0; i < monthNames.length; i++) {
    let rgx = new RegExp(`${monthNames[i]}`, "gi");
    //For neglecting cases that have Month names like "yasamra"
    if (rgx.test(month) && !month.replace(rgx, "").match(/([a-zA-Z])/g)) {
      monthSequence = i + 1;
      break;
    }
  }

  let format = month?.length > 3 ? "MMMM" : "MMM";

  return monthSequence === 0 ? null : [format, normalizeNumber(monthSequence)];
};

const returnFormatAndISO = (format, ISODate) => {
  return {
    format,
    ISODate,
  };
};

const parseDateTime = (param, options = { dayIsAtFirst: false }) => {
  //console.log({param , options});
  if (options?.customFormat) {
    let dateFnsParseResult;
    try {
      dateFnsParseResult = parse(param, options?.customFormat, new Date());
    } catch (error) {
      console.log("Error happend in datefns parser :", error);
    }
    //console.log({dateFnsParseResult});

    var currentDate = new Date();
    var timeZoneOffset = currentDate.getTimezoneOffset() * 60000;

    var localISOTime = new Date(dateFnsParseResult - timeZoneOffset)
      .toISOString()
      .slice(0, -1);

    console.log({ localISOTime });

    //Call date fns method
    //If error
    return returnFormatAndISO(options?.customFormat, localISOTime);
  }

  if (param === "") {
    return "";
  }

  let baseConfig = {
    //Join Date with (-)
    date: ["1970", "01", "01"],
    timeMarker: "T",
    //Join time with (:)
    time: ["00", "00", "00"],
    seconds: ".000",
    //Z or UTC offset (e.g. +3:30)
    timeZoneOffset: "Z",
  };
  try {
    param = param.trim();

    //if (isValidDate(param) && !dayIsAtFirst) return returnISOFormat(param);

    if (isTime(param)) {
      let [offset, timeStr] = normalizeTime(param);

      let splitedTime = timeStr.split(":");
      splitedTime[0] = `${+splitedTime[0] < 9 ? "0" : ""}${
        +splitedTime[0] + offset
      }`;

      for (let i = 0; i < baseConfig.time.length; i++) {
        //Check if passed time is more than 24
        if (+splitedTime?.[i] > 24) {
          throw new Error("Passed time is more than 24");
        }
        if (splitedTime?.[i] && baseConfig.time[i] !== splitedTime[i]) {
          baseConfig.time[i] = splitedTime[i];
        }
      }

      let timeFormat;
      if (splitedTime?.length === 3) {
        timeFormat = "HH:mm:ss";
      }
      if (splitedTime?.length === 2) {
        timeFormat = "HH:mm";
      }

      return returnFormatAndISO(
        timeFormat,
        baseConfig.date.join("-") +
          baseConfig.timeMarker +
          baseConfig.time.join(":") +
          baseConfig.seconds +
          baseConfig.timeZoneOffset
      );
    }

    let separatorChar = "-";
    const [charsMatched, normalizedDate] = normalizeDate(param);
    //console.log([charsMatched, normalizedDate]);
    let splitedDate = normalizedDate.split(separatorChar);

    if (splitedDate.length > 4) {
      return "Not a Date";
    }

    //For ignoring 21/03/2019 10:16:42
    if (splitedDate.length > 3 && options?.dayIsAtFirst) {
      return "Not a Date";
    }

    //For"1986-02-13T11:22:05.000Z && 1/1/2020 10:16:27 && Thursday, February 13, 1986 "
    if (splitedDate.length > 3 && !options?.dayIsAtFirst) {
      if (splitedDate?.[2].match(/T/g) && splitedDate?.[2].match(/:/g)) {
        return returnFormatAndISO(
          "yyyy-MM-dd'T'HH:mm:ss.SSSX",
          new Date(param).toISOString()
        );
      }
      if (splitedDate?.[3].match(/:/g)?.length === 2) {
        return returnFormatAndISO(
          "HH:mm:ss dd/MM/yyyy",
          new Date(param).toISOString()
        );
      }
      if (findMonthSequence(splitedDate?.[1])) {
        return returnFormatAndISO(
          "YYYY-MM-DDTHH:mm:ss",
          new Date(param).toISOString()
        );
      } else {
        return "Not a Date";
      }
    }
    if (splitedDate.length === 3) {
      //for "1986-02-13" and excluding Year of 2022
      if (splitedDate[0]?.length > 2 && /[^a-zA-Z]/g.test(splitedDate[0])) {
        return returnFormatAndISO(
          `yyyy${charsMatched[0]}MM${charsMatched[1]}dd`,
          new Date(param).toISOString()
        );
      }
      if (!findMonthSequence(normalizedDate)) {
        if (options?.dayIsAtFirst) {
          let [yearFormat, year] = normalizeYear(splitedDate[2]);
          baseConfig.date[2] = normalizeNumber(splitedDate[0]);
          baseConfig.date[1] = normalizeNumber(splitedDate[1]);
          baseConfig.date[0] = year;
          return returnFormatAndISO(
            `dd${charsMatched[0]}MM${charsMatched[1]}${yearFormat}`,
            createISOStr(baseConfig)
          );
        } else {
          let [yearFormat, year] = normalizeYear(splitedDate[2]);
          baseConfig.date[2] = normalizeNumber(splitedDate[1]);
          baseConfig.date[1] = normalizeNumber(splitedDate[0]);
          baseConfig.date[0] = year;
          return returnFormatAndISO(
            `MM${charsMatched[0]}dd${charsMatched[1]}${yearFormat}`,
            createISOStr(baseConfig)
          );
        }
      }
      //For December 5, 1997 format
      if (splitedDate[1].match(/,/g)) {
        splitedDate[1] = splitedDate[1].replace(/,/g, "");
        let [monthFormat, month] = findMonthSequence(splitedDate[0]);
        let [yearFormat, year] = normalizeYear(splitedDate[2]);

        baseConfig.date[2] = normalizeNumber(splitedDate[1]);
        baseConfig.date[1] = month;
        baseConfig.date[0] = year;

        return returnFormatAndISO(
          `${monthFormat} dd, ${yearFormat}`,
          createISOStr(baseConfig)
        );
      } else {
        let [monthFormat, month] = findMonthSequence(splitedDate[1]);
        let [yearFormat, year] = normalizeYear(splitedDate[2]);

        baseConfig.date[2] = normalizeNumber(splitedDate[0]);
        baseConfig.date[1] = month;
        baseConfig.date[0] = year;

        return returnFormatAndISO(
          `dd${charsMatched[0]}${monthFormat}${charsMatched[1]}${yearFormat}`,
          createISOStr(baseConfig)
        );
      }
    } else if (splitedDate.length === 2) {
      if (!findMonthSequence(normalizedDate)) {
        let [yearFormat, year] = normalizeYear(splitedDate[1]);
        baseConfig.date[0] = year;
        baseConfig.date[1] = normalizeNumber(splitedDate[0]);
        if (splitedDate[0]?.length > 2 && isNumber(splitedDate[0])) {
          baseConfig.date[0] = normalizeNumber(splitedDate[0]);
          baseConfig.date[1] = normalizeNumber(splitedDate[1]);
          return returnFormatAndISO(
            `yyyy${charsMatched[0]}MM`,
            createISOStr(baseConfig)
          );
        }
        return returnFormatAndISO(
          `MM${charsMatched[0]}${yearFormat}`,
          createISOStr(baseConfig)
        );
      } else {
        let formatSplited = [];
        splitedDate.forEach((chunk, index) => {
          if (isNumber(chunk)) {
            if (options?.dayIsAtFirst) {
              formatSplited[index] = "dd";
              baseConfig.date[2] = normalizeNumber(chunk);
            } else {
              let [yearFormat, year] = normalizeYear(chunk);
              formatSplited[index] = yearFormat;
              baseConfig.date[0] = year;
            }
          } else {
            let [monthFormat, month] = findMonthSequence(chunk);
            formatSplited[index] = monthFormat;
            baseConfig.date[1] = month;
          }
        });
        return returnFormatAndISO(
          formatSplited.join(charsMatched[0]),
          createISOStr(baseConfig)
        );
      }
    } else if (splitedDate.length === 1) {
      if (!findMonthSequence(splitedDate[0]) && isNumber(splitedDate[0])) {
        let [yearFormat, year] = normalizeYear(splitedDate[0]);
        baseConfig.date[0] = year;
        return returnFormatAndISO(yearFormat, createISOStr(baseConfig));
      }
      //For handling not-valid dates
      if (!findMonthSequence(splitedDate[0])) {
        return "Not a date";
      }

      let [monthFormat, month] = findMonthSequence(splitedDate[0]);
      baseConfig.date[1] = month;
      return returnFormatAndISO(monthFormat, createISOStr(baseConfig));
    }
  } catch (e) {
    console.log(e);
    return "Not a date";
  }
};

const checkDayIsAtFirst = (dateArr) => {
  let dayIsAtFirst = false;
  for (let i = 0; i < dateArr.length; i++) {
    const dateTime = dateArr[i] === null ? "" : dateArr[i].trim();
    if (isTime(dateTime)) continue;

    let separatorChar = "-";
    const normalizedDate = normalizeDate(dateTime)[1];

    let splitedDate = normalizedDate.split(separatorChar);

    if (
      +splitedDate[0] > 12 &&
      +splitedDate[0] <= 31 &&
      splitedDate.length === 3
    ) {
      dayIsAtFirst = true;
      break;
    }
    if (+splitedDate[0] >= 31 || +splitedDate[1] >= 31) {
      dayIsAtFirst = false;
      break;
    }
    if (
      (+splitedDate[0] > 12 || +splitedDate[1] > 12) &&
      (+splitedDate[0] <= 31 || +splitedDate[1] <= 31) &&
      splitedDate.length === 2
    ) {
      dayIsAtFirst = true;
    }
  }
  return dayIsAtFirst;
};

//console.log(parseDateTime('Tiffany Poedyasmara'));
//console.log(parseDateTime('13-Feb-86',false));
//console.log(parseDateTime('feb 13 2001'));
// console.log(parseDateTime('sep 76' , false));
// console.log(checkDayIsAtFirst(['nov 14' , 'sep 76' , 'mar 35']));
//console.log(parseDateTime('Year of 1990 && ' , false))
//console.log(parseDateTime('December 5, 1997'));
//console.log(parseDateTime('2020-02'));
// console.log(parseDateTime('World of Statistics 3666'));
// for (let i = 0; i < possibleInputs.length; i++) {
//   const element = possibleInputs[i];
//   console.log(
//     element,
//     "-----",
//     parseDateTime(element, { dayIsAtFirst: false, customFormat: "" })
//   );
// }
//console.log(parseDateTime("02/04/2020", { customFormat: "dd/MM/yyyy" }));
//console.log(parseDateTime("5.2 kg"));
//console.log(parseDateTime("30/02/22",{ dayIsAtFirst: true }))
module.exports = { checkDayIsAtFirst, parseDateTime };
