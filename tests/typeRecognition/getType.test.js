const { getType } = require("../../utils/getColumnsType");

describe("getType", () => {
  it('should return "string" for null input', () => {
    expect(getType(null)).toBe("string");
  });

  it('should return "date" for valid date format', () => {
    expect(getType("12.05.2022")).toBe("date");
  });

  it('should return "string" for empty string', () => {
    expect(getType("")).toBe("string");
  });

  it('should return "number" for numeric input', () => {
    expect(getType("123")).toBe("number");
  });

  it('should return "string" for non-numeric input', () => {
    expect(getType("abc")).toBe("string");
  });

  it('should return "number" for valid numeric input within the range', () => {
    expect(getType("42")).toBe("number");
  });
  it('should return "date" for valid numeric input within the range of 1500 & 2100', () => {
    expect(getType("2000")).toBe("date");
  });
  it('should return "string" for alphanumeric input', () => {
    expect(getType("abc123")).toBe("string");
    expect(getType("123abc")).toBe("string");
    expect(getType("abc123xyz")).toBe("string");
  });

  it('should return "string" for input with multiple alphabets', () => {
    expect(getType("Hello World")).toBe("string");
    expect(getType("OpenAI GPT-3")).toBe("string");
  });

  it('should return "number" for input with SI notation', () => {
    expect(getType("1k")).toBe("number");
    expect(getType("2M")).toBe("number");
    expect(getType("3.5B")).toBe("number");
  });

  it('should return "date" for input with ISO date format', () => {
    expect(getType("2023-06-24")).toBe("date");
    expect(getType("2023-06-24T12:00:00Z")).toBe("date");
  });
  it('should return "string" for input with special characters', () => {
    expect(getType("Hello!")).toBe("string");
    expect(getType("123@#$")).toBe("string");
    expect(getType("Hello, world!")).toBe("string");
  });

  it('should return "number" for input with valid float characters', () => {
    expect(getType("3.14")).toBe("number");
    expect(getType("0.5")).toBe("number");
    expect(getType("-2.7")).toBe("number");
  });

  it('should return "number" for input with comma as radix character', () => {
    expect(getType("1,000")).toBe("number");
    expect(getType("10,000.5")).toBe("number");
    expect(getType("-5,000")).toBe("number");
  });

  it('should return "string" for input with multiple alphabets and spaces', () => {
    expect(getType("OpenAI is awesome!")).toBe("string");
    expect(getType("This is a test sentence.")).toBe("string");
    expect(getType("I love programming and writing code.")).toBe("string");
  });
  it('should return "string" for input with multiple special characters', () => {
    expect(getType('!!')).toBe('string');
    expect(getType('$$')).toBe('string');
    expect(getType('#@#')).toBe('string');
  });

  it('should return "number" for input with scientific notation', () => {
    expect(getType('1e10')).toBe('number');
    expect(getType('2.5e-3')).toBe('number');
    expect(getType('-6.02e23')).toBe('number');
  });

  it('should return "string" for input with complex combination of characters', () => {
    expect(getType('abc123@#$')).toBe('string');
    expect(getType('12.34e5XYZ')).toBe('string');
    expect(getType('Hello, 1,000!')).toBe('string');
  });

  it('should return "date" for input with different date formats', () => {
    expect(getType('2023/06/24')).toBe('date');
    expect(getType('06-24-2023')).toBe('date');
  });

  it('should return "number" for input with large numbers', () => {
    expect(getType('10000000000000000000000000000000000000000000000000000')).toBe('number');
    expect(getType('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342')).toBe('number');
    expect(getType('-99999999999999999999999999999999999999999999999999999')).toBe('number');
  });
  it('should return "number" for input with dollar currency', () => {
    expect(getType('$100')).toBe('number');
    expect(getType('-$50')).toBe('number');
    expect(getType('$1,000.50')).toBe('number');
  });

  it('should return "number" for input with euro currency', () => {
    expect(getType('€50')).toBe('number');
    expect(getType('-€75.25')).toBe('number');
    expect(getType('€1,500.75')).toBe('number');
  });
  it('should return "string" for input with units like kg, cm, etc.', () => {
    expect(getType('10 kg')).toBe('string');
    expect(getType('2.5 cm')).toBe('string');
    expect(getType('500 g')).toBe('string');
  });
  it('should return "number" for numeric values in string format', () => {
    //expect(getType('4 015')).toBe('number');
    expect(getType('4 275')).toBe('number');
    expect(getType('4 275 345')).toBe('number');
  });
});
