/**
 * This is a function.
 *
 * @param {string} input - A string param
 * @param {string} [radixCharacter] - A optional radixCharcter
 * @return {number}
 */
const parseNumber = (
  input,
  options = { radixCharacter :"" , forceMode: false }
) => {
  //for handle null parameter
  if (input === null) {
    return { pureNumber: "" };
  }

  let innerRadixChar = options?.radixCharacter;
  //For converting "" from getRadixChar to "."
  //DISABLE : for 1.234.567
  //if (!options?.radixCharacter) innerRadixChar = ".";

  if (options?.customFormat) {
    innerRadixChar = options?.customFormat?.decimalSeparator;
  }

  let decimalSeparator = innerRadixChar;

  let thousandsSeparator = "";

  input = input.trim();

  let floatNormalizedString = normalizeFloatingCharacter(input, innerRadixChar);

  //Second condition for escaping 1.234.242 format
  const unUsedCharactersRegex = innerRadixChar ?
  new RegExp("[^0-9.-]+", "g") :
  new RegExp("[^0-9\-]+", "g")

  let unUsedArr = [];

  //Thousand separator recognition moved from string mutatin
  input.replace(
    /[^0-9\-]+/g,
    (x) => {
      if (!unUsedArr.includes(x) && /[.,'/ ]/g.test(x) && x !== innerRadixChar) {
        if (/[ ]/g.test(x)) {
          if (x?.length === 1) {
            unUsedArr.push(x);
          }
        } else {
          unUsedArr.push(x);
        }
      }
      return "";
    }
  );

  const numberStr = floatNormalizedString.replace(
    unUsedCharactersRegex , "");
    

  if (unUsedArr?.length) {
    thousandsSeparator = unUsedArr[0];
  }

  if (!numberStr)
    return options?.forceMode
      ? { pureNumber: "" }
      : { pureNumber: "Not a number" };

  var number = Number(numberStr);

  let [multiplySI, SIChar] = checkSIUnits(input);

  if (options?.customFormat) {
    SIChar = options?.customFormat?.SIChar || "";
    decimalSeparator = options?.customFormat?.decimalSeparator;
    thousandsSeparator = options?.customFormat?.thousandsSeparator || "";
  }

  return {
    format: {
      SIChar,
      decimalSeparator,
      thousandsSeparator,
    },
    pureNumber: (number * multiplySI).toString(),
  };
};

function checkSIUnits(param) {
  const SISymbolsDic = {
    kK: 10 ** 3,
    mM: 10 ** 6,
    bB: 10 ** 9,
    tT: 10 ** 12,
  };

  const siSymbols = Object.keys(SISymbolsDic);

  let multiply = 1;
  let SIChar = "";

  for (let i = 0; i < siSymbols.length; i++) {
    if (
      param.match(/([a-zA-Z])/g)?.length <= 1 &&
      (param.includes(siSymbols[i][0]) || param.includes(siSymbols[i][1]))
    ) {
      multiply = SISymbolsDic[siSymbols[i]];
      SIChar = siSymbols[i];
      break;
    }
  }

  return [multiply, SIChar];
}

function normalizeFloatingCharacter(string, floatCharacter) {
  if (floatCharacter === "." || !floatCharacter) {
    return string;
  }

  const removedDots = string.replace(/[.]/g, "");

  if (!floatCharacter) {
    return removedDots;
  }

  const floatRegex = new RegExp(`[${floatCharacter}]`, "g");
  return removedDots.replace(floatRegex, ".");
}

//console.log(parseNumber("24,93%", {radixCharacter : ","}));
//console.log(parseNumber("24,93%", {customFormat : {}}));
// console.log(parseNumber("0.136584", ""));
// console.log(parseNumber("136.584,000", ""));
// console.log(parseNumber("45,271,062.649K", "."));
// console.log(parseNumber("18 242 513.806", "."));
//console.log(parseNumber("11/11" , {radixCharacter:""}));
// console.log(parseNumber("% 26'490'376.063", { radixCharacter: "" }));
//console.log(parseNumber('-1.234.567'));
//console.log(parseNumber('1.234.567,23' , { radixCharacter :","}));

module.exports = { parseNumber };
