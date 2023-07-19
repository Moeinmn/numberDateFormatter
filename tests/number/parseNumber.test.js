const {
  getRadixCharacter,
} = require("../../utils/numberFormatter/getRadixCharacter");
const { parseNumber } = require("../../utils/numberFormatter/numberParser");

describe("70,843,828.071 Format", () => {
  let cases = [
    "70,843,828.071 ",
    "39,330,887.468 ",
    "45,271,062.649K",
    "81,695,434.434 ",
    "92,028,715.799",
    "76,345,448.225 ",
    "% 26,490,376.063",
    "56,044,896.321",
    "95,267,513.340 ",
    "15,911,208.927 ",
  ];
  let expected = [
    70843828.071, 39330887.468, 45271062649.0, 81695434.434, 92028715.799,
    76345448.225, 26490376.063, 56044896.321, 95267513.34, 15911208.927,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`.`);
  });

  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("70,428,676.871 Format", () => {
  let cases = [
    "70,428,676.871 ",
    "79069,503.763M",
    "54,677,911.145 ",
    "% 79,850,706.525",
    "31,833,437.557",
    "99,497,119.090",
    "25,652,985.272",
    "52,953,143.181 ",
    "85,683,977.454K",
    "5,923,526.305 %",
  ];

  let expected = [
    70428676.871, 79069503763000.0, 54677911.145, 79850706.525, 31833437.557,
    99497119.09, 25652985.272, 52953143.181, 85683977454.0, 5923526.305,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`.`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("34 615 245.531 Format", () => {
  let cases = [
    "34 615 245.531",
    "21 167 081.098 ",
    "74 537 690.586 m",
    "80 898 160.915",
    "18 242 513.806 ",
    "39 283 548.835 ",
    "95 397 714.371 ",
    "83 466 195.143 ",
    "12 008 483.058 ",
    "51 274 039.225 k",
  ];

  let expected = [
    34615245.531, 21167081.098, 74537690586000.0, 80898160.915, 18242513.806,
    39283548.835, 95397714.371, 83466195.143, 12008483.058, 51274039225.0,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`.`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("85.775.975,506 Format", () => {
  let cases = [
    "85.775.975,506",
    "4.587.767,611K",
    "87.791.711,731 ",
    "39.933.438,560",
    "82.627.468,797 M",
    "70.936.759,620 M",
    "67.750.857,627 m",
    "17.958.430,921",
    "4.467.630,927 ",
    "22.247.542,307 M",
  ];

  let expected = [
    85775975.506, 4587767611.0, 87791711.731, 39933438.56, 82627468797000.0,
    70936759620000.0, 67750857627000.01, 17958430.921, 4467630.927,
    22247542307000.0,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`,`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("37,179,079.420 Format", () => {
  let cases = [
    "37,179,079.420 ",
    "48,249,840.520 ",
    "16,435,647.541 ",
    "4,988,704.163K",
    "7,426,355.167 ",
    "4,678,273.135",
    "77,272,260.096 ",
    "86,361,434.270K",
    "39,985,301.670k",
    "88,340,762.582 ",
  ];

  let expected = [
    37179079.42, 48249840.52, 16435647.541, 4988704163.0, 7426355.167,
    4678273.135, 77272260.096, 86361434270.0, 39985301670.0, 88340762.582,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`.`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("78 337 705,708K Format", () => {
  let cases = [
    "78 337 705,708K",
    "27 073 407,677m",
    "9 237 324,828",
    "25 790 854,747 m",
    "92 466 405,365 ",
    "48 499 319,634K",
    "76 312 925,976 K",
    "42 230 040,586 ",
    "23 171 385,052K",
    "% 59 738 201,928",
  ];

  let expected = [
    78337705708.0, 27073407677000.0, 9237324.828, 25790854747000.0,
    92466405.365, 48499319634.0, 76312925976.0, 42230040.586, 23171385052.0,
    59738201.928,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`,`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("48,571,720/472K Format", () => {
  let cases = [
    "48,571,720/472K",
    "20,500,561/396 ",
    "80,060,709/763 M",
    "87,660,305/366 ",
    "70,377,623/488 ",
    "50,009,559/895 ",
    "57,304,888/675",
    "54,102,576/884 m",
    "35,520,983/806 m",
    "% 69,803,260/378",
  ];

  let expected = [
    48571720472.0, 20500561.396, 80060709763000.0, 87660305.366, 70377623.488,
    50009559.895, 57304888.675, 54102576884000.0, 35520983806000.0,
    69803260.378,
  ];
  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`/`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("26.577.529/465 k Format", () => {
  let cases = [
    "26.577.529/465 k",
    "37.843.556/332 k",
    "10.714.367/710 ",
    "56.305.600/729 ",
    "19.484.450/359 m",
    "78.393.655/841 ",
    "77.185.900/627 K",
    "30.184.087/103",
    "23.621.167/585",
    "99.112.716/715 ",
  ];

  let expected = [
    26577529465.0, 37843556332.0, 10714367.71, 56305600.729, 19484450359000.0,
    78393655.841, 77185900627.0, 30184087.103, 23621167.585, 99112716.715,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`/`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("85515611/172 M Format", () => {
  let cases = [
    "95027379/265 ",
    "85515611/172 M",
    "46530502/321",
    "57866044/302",
    "46820388/528M",
    "57798836/196 ",
    "88278566/415K",
    "7674364/237K",
    "33318002/859 K",
    "1744075/597 ",
  ];

  let expected = [
    95027379.265, 85515611172000.0, 46530502.321, 57866044.302,
    46820388528000.0, 57798836.196, 88278566415.0, 7674364237.0, 33318002859.0,
    1744075.597,
  ];
  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`/`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("72 708 346/212 Format", () => {
  let cases = [
    "72 708 346/212",
    "62 984 533/137 ",
    "91 012 482/150 ",
    "7 478 992/967",
    "41 379 368/365 ",
    "%54 524 783/178",
    "98 141 757/336m",
    "7 002 516/593",
    "%58 025 382/645",
    "56 484 323/447m",
  ];

  let expected = [
    72708346.212, 62984533.137, 91012482.15, 7478992.967, 41379368.365,
    54524783.178, 98141757336000.0, 7002516.593, 58025382.645, 56484323447000.0,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`/`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(parseNumber(numberStr, { radixCharacter: "/" }).pureNumber).toBe(
        `${expected[index]}`
      );
    });
  }
});

describe("5,464 b Format", () => {
  let cases = [
    "5,464 b",
    "5,821 ",
    "5,824B",
    "8,070K",
    "1,227 %",
    "6,073",
    "3,586 b",
    "5,971b",
    "5,741",
    "3,104",
  ];

  let expected = [
    5464000000000, 5821, 5824000000000, 8070000, 1227, 6073, 3586000000000,
    5971000000000, 5741, 3104,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(``);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("4849 k Format", () => {
  let cases = [
    "4849 k",
    "8941t",
    "1905 ",
    "767 ",
    "201 K",
    "5143B",
    "2493 ",
    "8006 ",
    "5188M",
    "3178 K",
  ];

  let expected = [
    4849000, 8941000000000000, 1905, 767, 201000, 5143000000000, 2493, 8006,
    5188000000, 3178000,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(``);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("4 491 % Format", () => {
  let cases = [
    "4 491 %",
    "8 332m",
    "5 032 K",
    "1 693 %",
    "2 252 t",
    "6 502 k",
    "5 618 ",
    "7 393 K",
    "6 406 %",
    "3 261b",
  ];

  let expected = [
    4491, 8332000000, 5032000, 1693, 2252000000000000, 6502000, 5618, 7393000,
    6406, 3261000000000,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(``);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("26,577,529k Format", () => {
  let cases = [
    "26,577,529k",
    "37,843,556k",
    "10,714,367",
    "56,305,600",
    "19,484,450m",
    "78,393,655",
    "77,185,900K",
    "30,184,087",
    "23,621,167",
    "99,112,716",
  ];

  let expected = [
    26577529000, 37843556000, 10714367, 56305600, 19484450000000, 78393655,
    77185900000, 30184087, 23621167, 99112716,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(``);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("70'843'828.071 Format", () => {
  let cases = [
    "70'843'828.071 ",
    "39'330'887.468 ",
    "45'271'062.649K",
    "81'695'434.434 ",
    "92'028'715.799",
    "76'345'448.225 ",
    "% 26'490'376.063",
    "56'044'896.321",
    "95'267'513.340 ",
    "1'000'000'000", // Additional test case with 1 billion
    "15'911'208.927 ",
  ];

  let expected = [
    70843828.071,
    39330887.468,
    45271062649.0,
    81695434.434,
    92028715.799,
    76345448.225,
    26490376.063,
    56044896.321,
    95267513.34,
    1000000000.0, // Expected value for 1 billion
    15911208.927,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`.`);
  });
  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});
describe("85.775.975,506 Format", () => {
  let cases = [
    "1.234.567",
    "85.775.975,506",
    "4.587.767,611K",
    "87.791.711,731 ",
    "39.933.438,560",
    "82.627.468,797 M",
    "70.936.759,620 M",
    "67.750.857,627 m",
    "17.958.430,921",
    "4.467.630,927 ",
    "22.247.542,307 M",
  ];

  let expected = [
    1234567, 85775975.506, 4587767611.0, 87791711.731, 39933438.56,
    82627468797000.0, 70936759620000.0, 67750857627000.01, 17958430.921,
    4467630.927, 22247542307000.0,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`,`);
  });

  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("12.345.678 Format", () => {
  let cases = [
    "1.234.567",
    "85.775.975",
    "4.587.767",
    "87.791.711",
    "39.933.438",
  ];

  let expected = [1234567, 85775975, 4587767, 87791711, 39933438];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(``);
  });

  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

describe("$340.54 Format", () => {
  let cases = [
    "$340.54",
    "$8.60",
    "$120.97",
    "$130.36",
    "$423.02",
    "$261.77",
    "$341.00",
    "$286.98",
    "$100.92",
    "$237.48",
  ];

  let expected = [
    340.54, 8.6, 120.97, 130.36, 423.02, 261.77, 341.0, 286.98, 100.92, 237.48,
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(`.`);
  });

  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});
describe("12,345,678 Format", () => {
  let cases = [
    "1,234,567",
    "85,775,975",
    "4,587,767",
    "87,791,711",
    "39,933,438",
  ];

  let expected = [1234567, 85775975, 4587767, 87791711, 39933438];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe(``);
  });

  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});
describe("Number Parsing Tests", () => {
  let cases = [
    '1,234.56K', '7.89M',
    '2.56B',     '3.14T',
    '890.12K',   '10.00M',
    '6.66B',     '9.99T',
    '456.78K'
  ];

  let expected = [
    1234560, 7890000,
    2560000000, 3140000000000,
    890120, 10000000,
    6660000000, 9990000000000,
    456780
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe('.');
  });

  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});
describe("Number Parsing Tests2", () => {
  let cases = [
    '1 234.56K', '7 89M',
    '2 56B',     '3 14T',
    '890 12K',   '10M',
    '6 66B',     '9 99T',
    '456 78K'
  ];

  let expected = [
    1234560, 789000000,
    256000000000, 314000000000000,
    89012000, 10000000,
    666000000000, 999000000000000,
    45678000
  ];

  let radixChar = getRadixCharacter(cases);
  test(`Radix Char`, () => {
    expect(radixChar).toBe('.');
  });

  for (let index = 0; index < cases.length; index++) {
    const numberStr = cases[index];
    test(`Item ${index}`, () => {
      expect(
        parseNumber(numberStr, { radixCharacter: radixChar }).pureNumber
      ).toBe(`${expected[index]}`);
    });
  }
});

