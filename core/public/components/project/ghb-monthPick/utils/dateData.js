/* eslint-disable */
export function getYear() {
  let yearList = [];
  for (let i = 1900; i < 2300; i++) {
    let opt = {
      text: i,
      value: i - 1900
    };
    yearList.push(opt);
  }
  return yearList;
}

export function getYearIndex (year) {
  for(let i = 0; i <= yearList.length; i++) {
    let item = yearList[i];
    if(item.text == year) {
      return item.value;
    }
  }
}

export const yearList = [
  { text: 1900, value: 0 },
  { text: 1901, value: 1 },
  { text: 1902, value: 2 },
  { text: 1903, value: 3 },
  { text: 1904, value: 4 },
  { text: 1905, value: 5 },
  { text: 1906, value: 6 },
  { text: 1907, value: 7 },
  { text: 1908, value: 8 },
  { text: 1909, value: 9 },
  { text: 1910, value: 10 },
  { text: 1911, value: 11 },
  { text: 1912, value: 12 },
  { text: 1913, value: 13 },
  { text: 1914, value: 14 },
  { text: 1915, value: 15 },
  { text: 1916, value: 16 },
  { text: 1917, value: 17 },
  { text: 1918, value: 18 },
  { text: 1919, value: 19 },
  { text: 1920, value: 20 },
  { text: 1921, value: 21 },
  { text: 1922, value: 22 },
  { text: 1923, value: 23 },
  { text: 1924, value: 24 },
  { text: 1925, value: 25 },
  { text: 1926, value: 26 },
  { text: 1927, value: 27 },
  { text: 1928, value: 28 },
  { text: 1929, value: 29 },
  { text: 1930, value: 30 },
  { text: 1931, value: 31 },
  { text: 1932, value: 32 },
  { text: 1933, value: 33 },
  { text: 1934, value: 34 },
  { text: 1935, value: 35 },
  { text: 1936, value: 36 },
  { text: 1937, value: 37 },
  { text: 1938, value: 38 },
  { text: 1939, value: 39 },
  { text: 1940, value: 40 },
  { text: 1941, value: 41 },
  { text: 1942, value: 42 },
  { text: 1943, value: 43 },
  { text: 1944, value: 44 },
  { text: 1945, value: 45 },
  { text: 1946, value: 46 },
  { text: 1947, value: 47 },
  { text: 1948, value: 48 },
  { text: 1949, value: 49 },
  { text: 1950, value: 50 },
  { text: 1951, value: 51 },
  { text: 1952, value: 52 },
  { text: 1953, value: 53 },
  { text: 1954, value: 54 },
  { text: 1955, value: 55 },
  { text: 1956, value: 56 },
  { text: 1957, value: 57 },
  { text: 1958, value: 58 },
  { text: 1959, value: 59 },
  { text: 1960, value: 60 },
  { text: 1961, value: 61 },
  { text: 1962, value: 62 },
  { text: 1963, value: 63 },
  { text: 1964, value: 64 },
  { text: 1965, value: 65 },
  { text: 1966, value: 66 },
  { text: 1967, value: 67 },
  { text: 1968, value: 68 },
  { text: 1969, value: 69 },
  { text: 1970, value: 70 },
  { text: 1971, value: 71 },
  { text: 1972, value: 72 },
  { text: 1973, value: 73 },
  { text: 1974, value: 74 },
  { text: 1975, value: 75 },
  { text: 1976, value: 76 },
  { text: 1977, value: 77 },
  { text: 1978, value: 78 },
  { text: 1979, value: 79 },
  { text: 1980, value: 80 },
  { text: 1981, value: 81 },
  { text: 1982, value: 82 },
  { text: 1983, value: 83 },
  { text: 1984, value: 84 },
  { text: 1985, value: 85 },
  { text: 1986, value: 86 },
  { text: 1987, value: 87 },
  { text: 1988, value: 88 },
  { text: 1989, value: 89 },
  { text: 1990, value: 90 },
  { text: 1991, value: 91 },
  { text: 1992, value: 92 },
  { text: 1993, value: 93 },
  { text: 1994, value: 94 },
  { text: 1995, value: 95 },
  { text: 1996, value: 96 },
  { text: 1997, value: 97 },
  { text: 1998, value: 98 },
  { text: 1999, value: 99 },
  { text: 2000, value: 100 },
  { text: 2001, value: 101 },
  { text: 2002, value: 102 },
  { text: 2003, value: 103 },
  { text: 2004, value: 104 },
  { text: 2005, value: 105 },
  { text: 2006, value: 106 },
  { text: 2007, value: 107 },
  { text: 2008, value: 108 },
  { text: 2009, value: 109 },
  { text: 2010, value: 110 },
  { text: 2011, value: 111 },
  { text: 2012, value: 112 },
  { text: 2013, value: 113 },
  { text: 2014, value: 114 },
  { text: 2015, value: 115 },
  { text: 2016, value: 116 },
  { text: 2017, value: 117 },
  { text: 2018, value: 118 },
  { text: 2019, value: 119 },
  { text: 2020, value: 120 },
  { text: 2021, value: 121 },
  { text: 2022, value: 122 },
  { text: 2023, value: 123 },
  { text: 2024, value: 124 },
  { text: 2025, value: 125 },
  { text: 2026, value: 126 },
  { text: 2027, value: 127 },
  { text: 2028, value: 128 },
  { text: 2029, value: 129 },
  { text: 2030, value: 130 },
  { text: 2031, value: 131 },
  { text: 2032, value: 132 },
  { text: 2033, value: 133 },
  { text: 2034, value: 134 },
  { text: 2035, value: 135 },
  { text: 2036, value: 136 },
  { text: 2037, value: 137 },
  { text: 2038, value: 138 },
  { text: 2039, value: 139 },
  { text: 2040, value: 140 },
  { text: 2041, value: 141 },
  { text: 2042, value: 142 },
  { text: 2043, value: 143 },
  { text: 2044, value: 144 },
  { text: 2045, value: 145 },
  { text: 2046, value: 146 },
  { text: 2047, value: 147 },
  { text: 2048, value: 148 },
  { text: 2049, value: 149 },
  { text: 2050, value: 150 }
];

export const monthList = [
  { text: "01", value: "01" },
  { text: "02", value: "02" },
  { text: "03", value: "03" },
  { text: "04", value: "04" },
  { text: "05", value: "05" },
  { text: "06", value: "06" },
  { text: "07", value: "07" },
  { text: "08", value: "08" },
  { text: "09", value: "09" },
  { text: "10", value: "10" },
  { text: "11", value: "11" },
  { text: "12", value: "12" }
];