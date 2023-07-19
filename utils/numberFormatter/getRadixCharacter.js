/**
 * This is a function.
 *
 * @param {string[]} array - A string param
 *
 * @return {string} it will return radix character
 * @throws {Error} Will throw an error if format of numbers are not same
 * @example
 *
 *     recognizeNumberFormat([
 *      "5,464b",
 *      "5,821 ",
 *      ])
 */

const normalizeWhiteSpace = (str) => {
  str = str?.trim();
  for (let index = 0; index < str.length; index++) {
    const element = str[index];
    if (element !== ' ') continue
    if(!str[index - 1].match(/[0-9]/g) || !str[index + 1].match(/[0-9]/g)){
      //console.log({str});
      let temp = [...str]
      temp.splice(index, 1)
      str = temp.join('')
    }
  }
  return str
}
// console.log(validateWhiteSpace('7 89M'));
// console.log(validateWhiteSpace('87.791.711,731 '));
// console.log(validateWhiteSpace(' 22.247.542,307 M'));

var getRadixCharacter = function (array) {
  var floatCharacters = [",", ".", "/"];
  var foundFloatChar = "";
  var allNumsAreSingleSymboled = true;

  //Checking if all numbers have single symbol
  for (let i = 0; i < array.length; i++) {
    const element = array[i] === null ? "" : normalizeWhiteSpace(array[i]);
    
    if (element.match(new RegExp(`[, ./]`, "g"))?.length > 1) {
      allNumsAreSingleSymboled = false;
      break;
    }
  }

  for (var i = 0; i < array.length; i++) {
    var element = array[i] === null ? "" : normalizeWhiteSpace(array[i]);
    var lastChar = "";
    var lastCharIndex = 0;

    // ! Space at the end of regex must not be deleted
    // For getting floatChars surrounded with numbers
    const numberOfAllChars = element.match(
      new RegExp(`([0-9])[${floatCharacters.join("")} ]([0-9])`, "g")
    )?.length;

    if (!numberOfAllChars) continue;

    if (numberOfAllChars === 1 && !allNumsAreSingleSymboled) continue;

    if (numberOfAllChars === 1 && !foundFloatChar && allNumsAreSingleSymboled) {
      //TODO : add slash caracter too
      if (element.includes(".")) {
        lastChar = ".";
        foundFloatChar = lastChar;
      }
      if (element.includes("/")) {
        lastChar = "/";
        foundFloatChar = lastChar;
      }
      // 1,300 would be seperator but 1,2 or 1,2234 would be radixChar
      if (element.includes(",")) {
        if (element.split(",")[1].match(/[0-9]/g)?.length !== 3) {
          lastChar = ",";
          foundFloatChar = lastChar;
        }
      }
      continue;
    }
    //Handling '$28.69',  '$2,163' 
    if (numberOfAllChars === 1 && foundFloatChar) {
      // 1,300 would be seperator but 1,2 or 1,2234 would be radixChar
      if (element.includes(",")) {
        if (element.split(",")[1].match(/[0-9]/g)?.length === 3) {
          continue;
        }
      }
    }
    for (var j = 0; j < floatCharacters.length; j++) {
      // console.log(floatCharacters[j]);
      // console.log({element});
      var character = floatCharacters[j];
      const charCount = element.match(
        new RegExp(`[${character}]`, "g")
      )?.length;

      if (!charCount || charCount > 1) {
        continue;
      }

      if (charCount > 1) {
        // console.log(element , character);
        floatCharacters[j] = null;

        if (foundFloatChar === character) foundFloatChar = "";
        lastChar = !lastChar ? foundFloatChar : lastChar;
        continue;
      }

      if (element.lastIndexOf(character) > lastCharIndex) {
        lastChar = character;
        lastCharIndex = element.lastIndexOf(character);
      }
    }
    if (!foundFloatChar) {
      foundFloatChar = lastChar;
    }
    if (foundFloatChar !== lastChar) {
      throw new Error("Formats are not same");
    }
  }
  return foundFloatChar;
};

// console.log(getRadixCharacter([
//   '$340.54', '$8.60',   '$120.97', '$130.36', '$423.02', '$261.77',
//   '$341.00', '$286.98', '$100.92', '$237.48', '$938.15', '$480.64',
//   '$468.98', '$107.25', '$165.52', '$145.44', '$157.18', '$42.49',
//   '$393.30', '$54.65',  '$161.83', '$867.43', '$151.74', '$119.09',
//   '$119.63', '$310.64', '$157.35', '$233.20', '$115.39', '$724.75',
//   '$60.22',  '$185.22', '$464.29', '$304.07', '$538.38', '$134.73',
//   '$107.28', '$28.69',  '$2,163',  '$0.53',   '$488.99', '$71.57',
//   '$160.75', '$298.41', '$100.91', '$83.35',  '$51.74',  '$31.08',
//   '$36.68',  '$211.26', '$60.38',  '$521.75', '$440.49', '$308.58',
//   '$109.02', '$381.08', '$113.91', '$1.03',   '$8.17',   '$240.00',
//   '$41.55',  '$110.37', '$0.49',   '$138.90', '$0.86',   '$180.02',
//   '$89.28',  '$883.79', '$42.68',  '$136.81', '$39.62',  '$37.19',
//   '$179.25', '$97.62',  '$59.67',  '$74.20',  '$0.54',   '$40.25',
//   '$72.95',  '$97.96',  '$85.40',  '$57.64',  '$33.44',  '$31.55',
//   '$207.50', '$53.90',  '$63.95',  '$165.82', '$95.51',  '$119.04',
//   '$225.70', '$52.13',  '$69.70',  '$174.20', '$400.89', '$458.19',
//   '$246.05', '$211.16', '$103.61'
// ]));
// console.log(getRadixCharacter([
//   "70'843'828.071 ",
//   "39'330'887.468 ",
//   "45'271'062.649K",
//   "81'695'434.434 ",
//   "92'028'715.799",
//   "76'345'448.225 ",
//   "% 26'490'376.063",
//   "56'044'896.321",
//   "95'267'513.340 ",
//   "15'911'208.927 ",
//   "1'000'000'000", // Additional test case with 1 billion
// ]));
// console.log(getRadixCharacter([
//   '70' , '12.5'
// ]));

module.exports = { getRadixCharacter };
