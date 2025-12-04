/*!
 * BS Calendar Data
 * ----------------
 * This dataset and related logic are developed and maintained by Jeeven Lamichhane.
 * Provides the number of days in each month for BS (Bikram Sambat) years.
 * This dataset is used for converting between AD (Gregorian) and BS dates.
 *
 * Copyright © 2025 Jeeven Lamichhane
 */
class BsCalendar {
  // -------------------------------
  // Nepali months (English)
  // -------------------------------
  static nepaliMonthsInEng() {
    return [
      "Baisakh",
      "Jestha",
      "Ashar",
      "Shrawan",
      "Bhadra",
      "Ashoj",
      "Kartik",
      "Mangsir",
      "Poush",
      "Magh",
      "Falgun",
      "Chaitra",
    ];
  }

  // -------------------------------
  // Nepali months (Nepali)
  // -------------------------------
  static nepaliMonthsInNep() {
    return [
      "बैशाख",
      "जेठ",
      "अषाढ",
      "श्रावण",
      "भाद्र",
      "आश्विन",
      "कार्तिक",
      "मङ्सिर",
      "पौष",
      "माघ",
      "फाल्गुन",
      "चैत्र",
    ];
  }

  // -------------------------------
  // Nepali weekdays
  // -------------------------------
  static nepaliWeekDays() {
    return [
      "आइतवार",
      "सोमवार",
      "मङ्गलवार",
      "बुधवार",
      "बिहिवार",
      "शुक्रवार",
      "शनिवार",
    ];
  }

  // -------------------------------
  // Nepali digits 0–9
  // -------------------------------
  static nepaliDigits() {
    return ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  }

  // -------------------------------
  // BS Calendar Data (YEAR → 12 month days + total)
  // Example Structure:
  // { 2070: [30, 32, ... , totalDays], ... }
  // -------------------------------
  static data() {
    return {
      1970: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
      1971: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
      1972: [31, 31, 32, 32, 31, 29, 31, 29, 30, 30, 29, 31, 366],
      1973: [31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 30, 30, 365],
      1974: [31, 31, 32, 31, 31, 30, 30, 29, 30, 30, 29, 31, 365],
      1975: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      1976: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      1977: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
      1978: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      1979: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      1980: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      1981: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
      1982: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      1983: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      1984: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      1985: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
      1986: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      1987: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      1988: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      1989: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      1990: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      1991: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
      1992: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
      1993: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      1994: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      1995: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
      1996: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
      1997: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      1998: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
      1999: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
      2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
      2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
      2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
      2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
      2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
      2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
      2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
      2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
      2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
      2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
      2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
      2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
      2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
      2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
      2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
      2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
      2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
      2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
      2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
      2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2062: [31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31, 365],
      2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
      2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
      2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
      2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
      2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
      2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
      2082: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2085: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
      2086: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2087: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2088: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
      2090: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2091: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2092: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2093: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
      2094: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2095: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
      2096: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
      2097: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
      2098: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
      2099: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
    };
  }

  // -------------------------------
  // Return year data
  // -------------------------------
  static getYear(year) {
    const d = this.data();
    return d[year] ?? null;
  }
}

/**
 * JS version of Jeeven Lamichhane's Official Logic
 * AD <-> BS Conversion (Gregorian <-> Bikram Sambat)
 */

class NepaliDateConverter {
  static bsData = BsCalendar.data();
  static refBS = { year: 2062, month: 1, day: 1 };
  static refAD = new Date("2005-04-14");
  static startYear = 1970;

  constructor(startYear = 1970) {
    if (startYear < 1970) startYear = 1970;
    NepaliDateConverter.startYear = startYear;
  }

  // --------------------------
  // Normalize input to YYYY-MM-DD
  // --------------------------
  static normalize(date) {
    const digits = date.replace(/\D/g, "");

    if (digits.length === 8) {
      return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(
        6,
        8
      )}`;
    }

    if (digits.length === 7) {
      const year = digits.slice(0, 4);
      const rest = digits.slice(4);

      let month, day;

      if (parseInt(rest[0]) > 1) {
        // M-D format
        month = "0" + rest[0];
        day = rest.slice(1);
      } else {
        // MM-D format
        month = rest.slice(0, 2);
        day = "0" + rest.slice(2);
      }

      return `${year}-${month}-${day}`;
    }

    throw new Error(`Invalid date format: ${date}`);
  }

  static pad(n) {
    return n.toString().padStart(2, "0");
  }

  // --------------------------
  // Total days since Nepali start year
  // --------------------------
  static totalDaysSince1970(y, m, d) {
    let days = 0;

    for (let Y = NepaliDateConverter.startYear; Y < y; Y++) {
      if (!this.bsData[Y]) throw new Error(`BS year missing: ${Y}`);
      days += this.bsData[Y][12];
    }

    for (let M = 1; M < m; M++) {
      days += this.bsData[y][M - 1];
    }

    return days + (d - 1);
  }

  // --------------------------
  // BS → AD
  // --------------------------
  static bsToAd(bsDate) {
    const norm = this.normalize(bsDate);
    let [y, m, d] = norm.split("-").map(Number);

    if (!this.bsData[y]) throw new Error("BS year out of range");

    const refDays = this.totalDaysSince1970(
      this.refBS.year,
      this.refBS.month,
      this.refBS.day
    );

    const targetDays = this.totalDaysSince1970(y, m, d);
    const diff = targetDays - refDays;

    const adDate = new Date(this.refAD);
    adDate.setDate(adDate.getDate() + diff);

    return adDate.toISOString().split("T")[0];
  }

  // --------------------------
  // AD → BS
  // --------------------------
  static adToBs(adDate, asObject = false) {
    const norm = this.normalize(adDate);
    let [y, m, d] = norm.split("-").map(Number);
    const adObj = new Date(`${y}-${m}-${d}`);

    this.totalDaysSince1970(
      this.refBS.year,
      this.refBS.month,
      this.refBS.day
    );

    const refADDays = Math.floor(this.refAD.getTime() / 86400000);
    const targetADDays = Math.floor(adObj.getTime() / 86400000);
    let diff = targetADDays - refADDays;

    let bsYear = this.refBS.year;
    let bsMonth = this.refBS.month;
    let bsDay = this.refBS.day;

    while (diff !== 0) {
      const monthDays = this.bsData[bsYear][bsMonth - 1];

      if (diff > 0) {
        bsDay++;
        if (bsDay > monthDays) {
          bsDay = 1;
          bsMonth++;
          if (bsMonth > 12) {
            bsMonth = 1;
            bsYear++;
          }
        }
        diff--;
      } else {
        bsDay--;
        if (bsDay < 1) {
          bsMonth--;
          if (bsMonth < 1) {
            bsMonth = 12;
            bsYear--;
          }
          bsDay = this.bsData[bsYear][bsMonth - 1];
        }
        diff++;
      }
    }

    const result = `${bsYear}-${this.pad(bsMonth)}-${this.pad(bsDay)}`;

    return result;
  }

  // --------------------------
  // Validate BS
  // --------------------------
  static isValidBSDate(bsDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(bsDate)) return false;

    const [y, m, d] = bsDate.split("-").map(Number);
    if (!this.bsData[y]) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > this.bsData[y][m - 1]) return false;

    try {
      return this.adToBs(this.bsToAd(bsDate)) === bsDate;
    } catch {
      return false;
    }
  }

  // --------------------------
  // Validate AD
  // --------------------------
  static isValidADDate(adDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(adDate)) return false;

    const [y, m, d] = adDate.split("-").map(Number);

    if (m < 1 || m > 12) return false;
    const valid = new Date(`${y}-${m}-${d}`);
    if (valid.getDate() !== d) return false;

    try {
      return this.bsToAd(this.adToBs(adDate)) === adDate;
    } catch {
      return false;
    }
  }

  // --------------------------
  // Weekday functions
  // --------------------------
  static weekdayAD(adDate, locale = "en") {
    const norm = this.normalize(adDate);
    const dayIndex = new Date(norm).getDay();

    if (locale === "np") {
      return BsCalendar.nepaliWeekDays()[dayIndex];
    }

    return new Date(norm).toLocaleString("en-US", { weekday: "long" });
  }

  static weekdayBS(bsDate, locale = "en") {
    return this.weekdayAD(this.bsToAd(bsDate), locale);
  }

  // --------------------------
  // Full info: BS date details
  // --------------------------
  static getBSInfo(bsDate) {
    if (!this.isValidBSDate(bsDate)) return {};

    const [y, m, d] = bsDate.split("-").map(Number);
    const ad = this.bsToAd(bsDate);

    const totalDaysYear = this.bsData[y][12];
    const dayOfYear =
      this.totalDaysSince1970(y, m, d) - this.totalDaysSince1970(y, 1, 1) + 1;

    const today = new Date();
    const todayBS = this.adToBs(today.toISOString().split("T")[0]);

    const diffDays =
      this.totalDaysSince1970(y, m, d) -
      this.totalDaysSince1970(...todayBS.split("-").map(Number));

    return {
      bs: bsDate,
      ad,
      weekday: this.weekdayBS(bsDate),
      total_days_in_year: totalDaysYear,
      day_of_year: dayOfYear,
      diff_days_from_today: diffDays,
    };
  }

  // --------------------------
  // Full info: AD date details
  // --------------------------
  static getADInfo(adDate) {
    if (!this.isValidADDate(adDate)) return {};

    const bs = this.adToBs(adDate);
    const [y, m, d] = bs.split("-").map(Number);

    const totalDaysYear = this.bsData[y][12];
    const dayOfYear =
      this.totalDaysSince1970(y, m, d) - this.totalDaysSince1970(y, 1, 1) + 1;

    const today = new Date();
    const todayBS = this.adToBs(today.toISOString().split("T")[0]);

    const diffDays =
      this.totalDaysSince1970(y, m, d) -
      this.totalDaysSince1970(...todayBS.split("-").map(Number));

    return {
      ad: adDate,
      bs,
      weekday: this.weekdayAD(adDate),
      total_days_in_year: totalDaysYear,
      day_of_year: dayOfYear,
      diff_days_from_today: diffDays,
    };
  }

  // --------------------------
  // Formatted BS (Nepali or English)
  // --------------------------
  static formattedNepaliDate(bsDate, format = "Y-m-d", locale = "en") {
    bsDate = this.normalize(bsDate);
    if (!this.isValidBSDate(bsDate)) {
      throw new Error(`Invalid BS date: ${bsDate}`);
    }

    let [y, m, d] = bsDate.split("-").map(Number);

    if (locale === "en") {
      return format
        .replace("Y", String(y))
        .replace("m", this.pad(m))
        .replace("d", this.pad(d));
    }

    // Nepali locale
    const monthsNep = BsCalendar.nepaliMonthsInNep();
    const weekdaysNep = BsCalendar.nepaliWeekDays();
    const digitsNep = BsCalendar.nepaliDigits();

    const adDate = this.bsToAd(bsDate);
    const weekdayIndex = new Date(adDate).getDay();

    const yearNep = [...String(y).padStart(4, "0")]
      .map((n) => digitsNep[n])
      .join("");
    const monthNep = [...String(m).padStart(2, "0")]
      .map((n) => digitsNep[n])
      .join("");
    const dayNep = [...String(d).padStart(2, "0")]
      .map((n) => digitsNep[n])
      .join("");
    const weekdayNep = weekdaysNep[weekdayIndex];

    return format
      .replace("Y", yearNep)
      .replace("m", monthNep)
      .replace("d", dayNep)
      .replace("F", monthsNep[m - 1])
      .replace("l", weekdayNep);
  }

  // --------------------------
  // Formatted AD (English or Nepali)
  // --------------------------
  static formattedEnglishDate(adDate, format = "Y-m-d", locale = "en") {
    adDate = this.normalize(adDate);
    if (!this.isValidADDate(adDate)) {
      throw new Error(`Invalid AD date: ${adDate}`);
    }

    if (locale === "en") {
      const [y, m, d] = adDate.split("-");
      return format
        .replace("Y", y)
        .replace("m", m)
        .replace("d", d)
        .replace(
          "F",
          new Date(adDate).toLocaleString("en-US", { month: "long" })
        )
        .replace(
          "l",
          new Date(adDate).toLocaleString("en-US", { weekday: "long" })
        );
    }

    // Nepali locale → Convert AD to BS
    const bsDate = this.adToBs(adDate);
    const [y, m, d] = bsDate.split("-");

    const digitsNep = BsCalendar.nepaliDigits();
    const monthsNep = BsCalendar.nepaliMonthsInNep();
    const weekdaysNep = BsCalendar.nepaliWeekDays();

    const weekdayIndex = new Date(adDate).getDay();

    const yearNep = [...y].map((n) => digitsNep[n]).join("");
    const monthNepNum = [...m].map((n) => digitsNep[n]).join("");
    const dayNep = [...d].map((n) => digitsNep[n]).join("");
    const weekdayNep = weekdaysNep[weekdayIndex];

    return format
      .replace("Y", yearNep)
      .replace("m", monthNepNum)
      .replace("d", dayNep)
      .replace("F", monthsNep[Number(m) - 1])
      .replace("l", weekdayNep);
  }
}

export { NepaliDateConverter as default };
//# sourceMappingURL=nepali-date-converter.esm.js.map
