const { parseDateTime } = require("../../utils/dataFormatter/dateParser");

describe("Testing Dates", () => {
  const testCases = [
    {
      testCase: "1986-02-13T11:22:05.000Z",
      result: {
        format: "yyyy-MM-dd'T'HH:mm:ss.SSSX",
        ISODate: "1986-02-13T11:22:05.000Z",
      },
    },
    {
      testCase: "1986-02-13",
      result: { format: "yyyy-MM-dd", ISODate: "1986-02-13T00:00:00.000Z" },
    },
    {
      testCase: "02/11/1986",
      result: { format: "MM/dd/yyyy", ISODate: "1986-02-11T00:00:00.000Z" },
    },
    {
      testCase: "30/02/22",
      option: {
        dayIsAtFirst: true,
      },
      result: { format: "dd/MM/yy", ISODate: "2022-02-30T00:00:00.000Z" },
    },
    {
      testCase: "13-Feb-1986",
      result: { format: "dd-MMM-yyyy", ISODate: "1986-02-13T00:00:00.000Z" },
    },
    {
      testCase: "13-Feb-86",
      result: { format: "dd-MMM-yy", ISODate: "1986-02-13T00:00:00.000Z" },
    },
    {
      testCase: "02/1986",
      result: { format: "MM/yyyy", ISODate: "1986-02-01T00:00:00.000Z" },
    },
    {
      testCase: "02/86",
      result: { format: "MM/yy", ISODate: "1986-02-01T00:00:00.000Z" },
    },
    {
      testCase: "Feb 1986",
      result: { format: "MMM yyyy", ISODate: "1986-02-01T00:00:00.000Z" },
    },
    {
      testCase: "Feb 86",
      result: { format: "MMM yy", ISODate: "1986-02-01T00:00:00.000Z" },
    },
    {
      testCase: "Feb 13",
      result: { format: "MMM yy", ISODate: "2013-02-01T00:00:00.000Z" },
    },
    {
      testCase: "February 13",
      result: { format: "MMMM yy", ISODate: "2013-02-01T00:00:00.000Z" },
    },
    {
      testCase: "13 Feb",
      result: { format: "yy MMM", ISODate: "2013-02-01T00:00:00.000Z" },
    },
    {
      testCase: "1986",
      result: { format: "yyyy", ISODate: "1986-01-01T00:00:00.000Z" },
    },
    {
      testCase: "86",
      result: { format: "yy", ISODate: "1986-01-01T00:00:00.000Z" },
    },
    {
      testCase: "February",
      result: { format: "MMMM", ISODate: "1970-02-01T00:00:00.000Z" },
    },
    {
      testCase: "Feb",
      result: { format: "MMM", ISODate: "1970-02-01T00:00:00.000Z" },
    },
    {
      testCase: "December 5, 2001",
      result: { format: "MMMM dd, yyyy", ISODate: "2001-12-05T00:00:00.000Z" },
    },
    {
      testCase: "11:22:05",
      result: { format: "HH:mm:ss", ISODate: "1970-01-01T11:22:05.000Z" },
    },
    {
      testCase: "11:22",
      result: { format: "HH:mm", ISODate: "1970-01-01T11:22:00.000Z" },
    },
    {
      testCase: "02-13-1986",
      result: { format: "MM-dd-yyyy", ISODate: "1986-02-13T00:00:00.000Z" },
    },
    {
      testCase: "2/13",
      result: { format: "MM/yy", ISODate: "2013-02-01T00:00:00.000Z" },
    },
    {
      testCase: "02-13",
      result: { format: "MM-yy", ISODate: "2013-02-01T00:00:00.000Z" },
    },
    {
      testCase: "13-Feb",
      result: { format: "yy-MMM", ISODate: "2013-02-01T00:00:00.000Z" },
    },
    {
      testCase: "13-Feb-1986",
      result: { format: "dd-MMM-yyyy", ISODate: "1986-02-13T00:00:00.000Z" },
    },
    {
      testCase: "February 13, 1986",
      result: { format: "MMMM dd, yyyy", ISODate: "1986-02-13T00:00:00.000Z" },
    },
    {
      testCase: "Feb-13",
      result: { format: "MMM-yy", ISODate: "2013-02-01T00:00:00.000Z" },
    },
    {
      testCase: "Feb 13, 1986",
      result: { format: "MMM dd, yyyy", ISODate: "1986-02-13T00:00:00.000Z" },
    },
    // {
    //   testCase: "Thursday, February 13, 1986",
    //   result: {
    //     format: "YYYY-MM-DDTHH:mm:ss",
    //     ISODate: "1986-02-13T00:00:00.000Z",
    //   },
    // },
    {
      testCase: "2020-02",
      result: { format: "yyyy-MM", ISODate: "2020-02-01T00:00:00.000Z" },
    },
    // {
    //   testCase: "1/1/2020 10:16:27",
    //   result: {
    //     format: "HH:mm:ss dd/MM/yyyy",
    //     ISODate: "2020-01-01T06:46:27.000Z",
    //   },
    // },
  ];
  for (let index = 0; index < testCases.length; index++) {
    const testCase = testCases[index]["testCase"];
    const option = testCases[index]["option"];
    test(`Testing ${testCase}`, () => {
      expect(parseDateTime(testCase, option)).toMatchObject(
        testCases[index]["result"]
      );
    });
  }
});
