# plotset-formatter <!-- omit in toc -->

[![NPM version](https://img.shields.io/npm/v/plotset-formatter)](https://www.npmjs.com/package/plotset-formatter)

**node.js**:

```bash
npm install plotset-formatter
```

# Usage examples

### getType

```js
// node.js, "classic" way:
var { getType } = require("plotset-formatter");
//for detect the input type
getType("123");
//return string-number-date
```

### getColumnsType

```js
// node.js, "classic" way:
var { getColumnsType } = require("plotset-formatter");
//for detect type of columns in data
getColumnsType(arrayData, arrayColumns);

// return {
//        string: [col1,col2,col4],
//       date: [col2,col5],
//       number: [col6],
//     }
```

# Number

## parser

### getRadixCharacter

```js
// node.js, "classic" way:
var {getRadixCharacter}=require("plotset-formatter")
//for detect floating point array number
getRadixCharacter(["3,828.071","330,887.468",...]);

// return '.', ',', '/'

```

### parseNumber

```js
// node.js, "classic" way:
var { parseNumber } = require("plotset-formatter");
//for formatted numbers
parseNumber(input, (radixCharacter = "."), (forceMode = false));

// return  100k=>100000,
```

## Formatter

### numberFormatter

```js
// node.js, "classic" way:
var {numberFormatter}=require("plotset-formatter")
//for formatted numbers
const numberFormatter(number,pattern);

//pattern=>0.00,number=>100
// return=>100.00,

```

# Date

## parser

### checkDayIsAtFirst

```js
// node.js, "classic" way:
var { checkDayIsAtFirst } = require("plotset-formatter");
//for detect date pattern and check :dd-mm-yyy or mm-dd-yyy or mm-yy or mm-dd
checkDayIsAtFirst();

//  return false or true
```

### parseDateTime

```js
// node.js, "classic" way:
var { parseDateTime } = require("plotset-formatter");
//for formatted date
parseDateTime(input, (dayIsAtFirst = false));

// return  feb 13 => iso time ,
```

## Formatter

### dateFormatter

```js
// node.js, "classic" way:
var {dateFormatter}=require("plotset-formatter")
//for formatted date
const dateFormatter(date,pattern);

//pattern=>YYY,date=>ISO Time
// return=>1986


```

## References / Thanks

[plotset](https://plotset.com/)
