import BsCalendar from "./BsCalendar.js";

/**
 * NepaliDateConverter.js
 * ------------------------
 * Conversion between AD (Gregorian) and BS (Bikram Sambat)
 * This is the core conversion class logic.
 */
class NepaliDateConverter {
  static bsData = BsCalendar.data();
  static refBS = { year: 2062, month: 1, day: 1 };
  // 14 April 2005. Using UTC to prevent local timezone issues with date arithmetic.
  static refAD = new Date("2005-04-14T00:00:00Z");
  static startYear = 1970; // Default start year for data iteration

  // Dataset for Nepali translations
  static monthsNep = BsCalendar.nepaliMonthsInNep();
  static weekdaysNep = BsCalendar.nepaliWeekDays();
  static digitsNep = BsCalendar.nepaliDigits();

  constructor(config = {}) {
    // Initialization logic (if needed, but static methods are generally preferred for date utilities)
    const startYear = config.start_year || NepaliDateConverter.startYear;
    if (startYear > NepaliDateConverter.startYear) {
      NepaliDateConverter.startYear = startYear;
    }

    // Quick check to ensure the reference date is valid
    if (isNaN(NepaliDateConverter.refAD.getTime())) {
      throw new Error("Initialization Error: Reference AD Date is invalid.");
    }
  }

  /**
   * Normalizes a date string into 'YYYY-MM-DD' format.
   * (Logic remains identical to the PHP version for consistency)
   */
  static normalize(date, dateType = "en") {
    const digits = date.replace(/\D/g, "");
    let year, month, day;

    if (digits.length === 8) {
      year = digits.substring(0, 4);
      month = digits.substring(4, 6);
      day = digits.substring(6, 8);
    } else if (digits.length === 7) {
      year = digits.substring(0, 4);
      const rest = digits.substring(4);

      // Logic to disambiguate YYYYMDD vs YYYYMMD (based on PHP logic)
      if (parseInt(rest.substring(0, 1)) > 1) {
        month = "0" + rest.substring(0, 1);
        day = rest.substring(1, 3);
      } else {
        month = rest.substring(0, 2);
        day = "0" + rest.substring(2, 3);
      }
    } else {
      throw new Error(`Invalid date format: ${date}`);
    }

    const dateStr = `${year}-${month}-${day}`;

    // Basic validation for AD (using JavaScript's Date object for Gregorian validation)
    if (dateType === "en") {
      const dObj = new Date(
        Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day))
      );
      if (isNaN(dObj.getTime()) || dObj.getUTCFullYear() != parseInt(year)) {
        throw new Error(`Invalid AD date: ${dateStr}`);
      }
    }

    return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;
  }

  /**
   * Calculates the total number of days passed in the BS calendar since self::$startYear.
   */
  static totalDaysSinceStartYear(y, m, d) {
    let days = 0;
    const startYear = NepaliDateConverter.startYear;

    for (let Y = startYear; Y < y; Y++) {
      if (!NepaliDateConverter.bsData[Y]) {
        throw new Error(`BS Year ${Y} not in dataset`);
      }
      days += NepaliDateConverter.bsData[Y][12];
    }

    for (let M = 1; M < m; M++) {
      days += NepaliDateConverter.bsData[y][M - 1];
    }

    days += d - 1; // Subtract 1 day because date is 1-indexed
    return days;
  }

  // -------------------
  // BS → AD
  // -------------------
  static bsToAd(bsDate) {
    const [by, bm, bd] = NepaliDateConverter.normalize(bsDate, "np")
      .split("-")
      .map(Number);

    if (!NepaliDateConverter.bsData[by]) {
      throw new Error("BS Year out of range");
    }

    const refBS = NepaliDateConverter.refBS;
    const refAD = NepaliDateConverter.refAD;

    const refTotal = NepaliDateConverter.totalDaysSinceStartYear(
      refBS.year,
      refBS.month,
      refBS.day
    );
    const targetTotal = NepaliDateConverter.totalDaysSinceStartYear(by, bm, bd);
    const diff = targetTotal - refTotal;

    // Clone reference date and add the difference in days (using UTC)
    const ad = new Date(refAD.getTime());
    ad.setUTCDate(ad.getUTCDate() + diff);

    // Return in YYYY-MM-DD format (UTC values)
    return `${ad.getUTCFullYear().toString().padStart(4, "0")}-${(
      ad.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${ad.getUTCDate().toString().padStart(2, "0")}`;
  }

  // -------------------
  // AD → BS
  // -------------------
  static adToBs(adDate, asObject = false) {
    const [ay, am, ad] = NepaliDateConverter.normalize(adDate)
      .split("-")
      .map(Number);
    const adDateObj = new Date(Date.UTC(ay, am - 1, ad));

    const refBS = NepaliDateConverter.refBS;
    const refAD = NepaliDateConverter.refAD;

    // Calculate days difference (Target AD - Reference AD)
    const oneDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.round(
      (adDateObj.getTime() - refAD.getTime()) / oneDay
    );

    let bsYear = refBS.year;
    let bsMonth = refBS.month;
    let bsDay = refBS.day;
    let diff = diffDays;

    while (diff !== 0) {
      const monthDays = NepaliDateConverter.bsData[bsYear]?.[bsMonth - 1];
      if (monthDays === undefined) {
        throw new Error(`BS Year ${bsYear} not in dataset during conversion.`);
      }

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
          bsDay = NepaliDateConverter.bsData[bsYear][bsMonth - 1];
        }
        diff++;
      }
    }

    const bsDateStr = `${bsYear.toString().padStart(4, "0")}-${bsMonth
      .toString()
      .padStart(2, "0")}-${bsDay.toString().padStart(2, "0")}`;

    if (asObject) {
      // Mocking the BsDate object from PHP
      return { year: bsYear, month: bsMonth, day: bsDay };
    }

    return bsDateStr;
  }

  // -------------------
  // Validation, Info, and Weekdays are implemented below,
  // mirroring the PHP class.
  // -------------------
  static isValidBSDate(bsDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(bsDate)) return false;

    try {
      const [y, m, d] = bsDate.split("-").map(Number);
      if (!NepaliDateConverter.bsData[y]) return false;
      if (m < 1 || m > 12) return false;

      const maxDays = NepaliDateConverter.bsData[y][m - 1];
      if (d < 1 || d > maxDays) return false;

      // Round-trip validation
      return (
        NepaliDateConverter.adToBs(NepaliDateConverter.bsToAd(bsDate)) ===
        bsDate
      );
    } catch (e) {
      return false;
    }
  }

  static isValidADDate(adDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(adDate)) return false;

    try {
      const [y, m, d] = adDate.split("-").map(Number);
      // Date validation check
      const dObj = new Date(Date.UTC(y, m - 1, d));
      if (isNaN(dObj.getTime()) || dObj.getUTCFullYear() !== y) return false;

      // Round-trip validation
      return (
        NepaliDateConverter.bsToAd(NepaliDateConverter.adToBs(adDate)) ===
        adDate
      );
    } catch (e) {
      return false;
    }
  }

  static weekdayAD(adDate, locale = "en") {
    const normalizedDate = NepaliDateConverter.normalize(adDate);
    const date = new Date(`${normalizedDate}T00:00:00Z`);
    const dayIndex = date.getUTCDay(); // 0 = Sunday, 6 = Saturday

    if (locale === "np") {
      return NepaliDateConverter.weekdaysNep[dayIndex];
    }

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "UTC",
    });
  }

  static weekdayBS(bsDate, locale = "en") {
    return NepaliDateConverter.weekdayAD(
      NepaliDateConverter.bsToAd(bsDate),
      locale
    );
  }

  static getBSInfo(bsDate) {
    if (!NepaliDateConverter.isValidBSDate(bsDate)) return {};

    const [y, m, d] = bsDate.split("-").map(Number);
    const ad = NepaliDateConverter.bsToAd(bsDate);

    const totalDaysInYear = NepaliDateConverter.bsData[y][12];
    const dayOfYear =
      NepaliDateConverter.totalDaysSinceStartYear(y, m, d) -
      NepaliDateConverter.totalDaysSinceStartYear(y, 1, 1) +
      1;

    const todayAD = new Date().toISOString().substring(0, 10);
    const todayBS = NepaliDateConverter.adToBs(todayAD);
    const [ty, tm, td] = todayBS.split("-").map(Number);

    const diffDays =
      NepaliDateConverter.totalDaysSinceStartYear(y, m, d) -
      NepaliDateConverter.totalDaysSinceStartYear(ty, tm, td);

    return {
      bs: bsDate,
      ad: ad,
      weekday: NepaliDateConverter.weekdayBS(bsDate),
      total_days_in_year: totalDaysInYear,
      day_of_year: dayOfYear,
      diff_days_from_today: diffDays,
    };
  }

  static getADInfo(adDate) {
    if (!NepaliDateConverter.isValidADDate(adDate)) return {};

    const bs = NepaliDateConverter.adToBs(adDate);
    const [y, m, d] = bs.split("-").map(Number);

    const totalDaysInYear = NepaliDateConverter.bsData[y][12];
    const dayOfYear =
      NepaliDateConverter.totalDaysSinceStartYear(y, m, d) -
      NepaliDateConverter.totalDaysSinceStartYear(y, 1, 1) +
      1;

    const todayAD = new Date().toISOString().substring(0, 10);
    const todayBS = NepaliDateConverter.adToBs(todayAD);
    const [ty, tm, td] = todayBS.split("-").map(Number);

    const diffDays =
      NepaliDateConverter.totalDaysSinceStartYear(y, m, d) -
      NepaliDateConverter.totalDaysSinceStartYear(ty, tm, td);

    return {
      ad: adDate,
      bs: bs,
      weekday: NepaliDateConverter.weekdayAD(adDate),
      total_days_in_year: totalDaysInYear,
      day_of_year: dayOfYear,
      diff_days_from_today: diffDays,
    };
  }

  static digitToNepali(dgt) {
    return NepaliDateConverter.digitsNep[parseInt(dgt)];
  }

  // -------------------
  // Formatted Date methods
  // -------------------

  static formattedNepaliDate(bsDate, format = "Y-m-d", locale = "en") {
    const normalizedBsDate = NepaliDateConverter.normalize(bsDate, "np");

    if (!NepaliDateConverter.isValidBSDate(normalizedBsDate)) {
      throw new Error(`Invalid BS date: ${normalizedBsDate}`);
    }

    const [y, m, d] = normalizedBsDate.split("-").map(Number);
    const adDate = NepaliDateConverter.bsToAd(normalizedBsDate);
    const adDateObj = new Date(`${adDate}T00:00:00Z`);
    const weekdayIndex = adDateObj.getUTCDay();

    let formatted = format;

    // Common replacements (English digits)
    const commonReplacements = {
      Y: y.toString().padStart(4, "0"),
      m: m.toString().padStart(2, "0"),
      d: d.toString().padStart(2, "0"),
    };

    for (const [key, value] of Object.entries(commonReplacements)) {
      formatted = formatted.replace(new RegExp(key, "g"), value);
    }

    if (locale === "en") {
      // Note: In the original PHP, 'F' and 'l' were not replaced for 'en' locale here,
      // but we'll add basic month/weekday names for a more useful utility.
      const enNameReplacements = {
        F: NepaliDateConverter.monthsNep[m - 1], // BS Month name in Nepali
        l: NepaliDateConverter.weekdayAD(adDate), // English weekday
      };
      for (const [key, value] of Object.entries(enNameReplacements)) {
        formatted = formatted.replace(new RegExp(key, "g"), value);
      }
      return formatted;
    }

    // Nepali locale (convert digits and names to Nepali)
    const yearNep = String(y)
      .padStart(4, "0")
      .split("")
      .map(NepaliDateConverter.digitToNepali)
      .join("");
    const monthNumNep = String(m)
      .padStart(2, "0")
      .split("")
      .map(NepaliDateConverter.digitToNepali)
      .join("");
    const dayNep = String(d)
      .padStart(2, "0")
      .split("")
      .map(NepaliDateConverter.digitToNepali)
      .join("");

    const nepaliReplacements = {
      Y: yearNep,
      m: monthNumNep,
      d: dayNep,
      F: NepaliDateConverter.monthsNep[m - 1], // Full Nepali month name
      l: NepaliDateConverter.weekdaysNep[weekdayIndex], // Full Nepali weekday name
    };

    let nepaliFormatted = format;
    for (const [key, value] of Object.entries(nepaliReplacements)) {
      nepaliFormatted = nepaliFormatted.replace(new RegExp(key, "g"), value);
    }

    return nepaliFormatted;
  }

  static formattedEnglishDate(adDate, format = "Y-m-d", locale = "en") {
    const normalizedAdDate = NepaliDateConverter.normalize(adDate);

    if (!NepaliDateConverter.isValidADDate(normalizedAdDate)) {
      throw new Error(`Invalid AD date: ${normalizedAdDate}`);
    }

    const adDateObj = new Date(`${normalizedAdDate}T00:00:00Z`);
    const [ay, am, ad] = normalizedAdDate.split("-").map(Number);

    let formatted = format;

    if (locale === "en") {
      // English formatting (AD values)
      const englishReplacements = {
        Y: ay.toString().padStart(4, "0"),
        m: am.toString().padStart(2, "0"),
        d: ad.toString().padStart(2, "0"),
        F: adDateObj.toLocaleDateString("en-US", {
          month: "long",
          timeZone: "UTC",
        }),
        l: adDateObj.toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "UTC",
        }),
      };

      for (const [key, value] of Object.entries(englishReplacements)) {
        formatted = formatted.replace(new RegExp(key, "g"), value);
      }
      return formatted;
    }

    // Nepali locale → AD to BS values, then format in Nepali script
    const bsDate = NepaliDateConverter.adToBs(normalizedAdDate);
    const [by, bm, bd] = bsDate.split("-").map(Number); // BS values
    const weekdayIndex = adDateObj.getUTCDay();

    // Convert BS components to Nepali script
    const dayNep = String(bd)
      .padStart(2, "0")
      .split("")
      .map(NepaliDateConverter.digitToNepali)
      .join("");
    const monthNumNep = String(bm)
      .padStart(2, "0")
      .split("")
      .map(NepaliDateConverter.digitToNepali)
      .join("");
    const yearNep = String(by)
      .padStart(4, "0")
      .split("")
      .map(NepaliDateConverter.digitToNepali)
      .join("");

    const nepaliReplacements = {
      Y: yearNep,
      m: monthNumNep,
      d: dayNep,
      F: NepaliDateConverter.monthsNep[bm - 1], // Full Nepali month name
      l: NepaliDateConverter.weekdaysNep[weekdayIndex], // Full Nepali weekday name
    };

    for (const [key, value] of Object.entries(nepaliReplacements)) {
      formatted = formatted.replace(new RegExp(key, "g"), value);
    }

    return formatted;
  }

  static today(locale = "en", format = "Y-m-d") {
    const todayAd = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const todayBs = NepaliDateConverter.adToBs(todayAd);

    if (locale === "np") {
      return NepaliDateConverter.formattedNepaliDate(todayBs, format, locale);
    }

    return NepaliDateConverter.formattedEnglishDate(todayAd, format, locale);
  }

  static diff(date1, date2, dateType = "en", returnIn = null) {
    // 1️⃣ Normalize
    date1 = NepaliDateConverter.normalize(date1, dateType);
    date2 = NepaliDateConverter.normalize(date2, dateType);

    // 2️⃣ Convert BS → AD if needed
    if (dateType === "np") {
      date1 = NepaliDateConverter.bsToAd(date1);
      date2 = NepaliDateConverter.bsToAd(date2);
    }

    const dt1 = new Date(`${date1}T00:00:00Z`);
    const dt2 = new Date(`${date2}T00:00:00Z`);

    if (isNaN(dt1) || isNaN(dt2)) {
      throw new Error(`Invalid date(s): ${date1} or ${date2}`);
    }

    // 3️⃣ Calculate difference
    const diffMs = Math.abs(dt1 - dt2);

    const years = dt1.getUTCFullYear() - dt2.getUTCFullYear();
    const months = years * 12 + (dt1.getUTCMonth() - dt2.getUTCMonth());

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = diffMs / (1000 * 60 * 60);
    const minutes = diffMs / (1000 * 60);
    const seconds = diffMs / 1000;

    const result = {
      years: Math.abs(years),
      months: Math.abs(months),
      days,
      hours,
      minutes,
      seconds,
    };

    if (returnIn && result[returnIn] !== undefined) {
      return result[returnIn];
    }

    return result;
  }

  static humanDiff(date1, date2, dateType = "en", locale = "en") {
    const diff = NepaliDateConverter.diff(date1, date2, dateType);

    const years = diff.years;
    const months = diff.months % 12;
    let days = diff.days - years * 365 - months * 30;
    if (days < 0) days = 0;

    const labelsEn = { year: "year", month: "month", day: "day" };
    const labelsNp = { year: "वर्ष", month: "महिना", day: "दिन" };

    const L = locale === "np" ? labelsNp : labelsEn;

    const convert = (n) =>
      locale === "np" ? NepaliDateConverter.toNepaliDigits(n) : n;

    const parts = [];

    if (years > 0)
      parts.push(
        `${convert(years)} ${L.year}${locale === "en" && years > 1 ? "s" : ""}`
      );

    if (months > 0)
      parts.push(
        `${convert(months)} ${L.month}${
          locale === "en" && months > 1 ? "s" : ""
        }`
      );

    if (days > 0 || parts.length === 0)
      parts.push(
        `${convert(days)} ${L.day}${locale === "en" && days > 1 ? "s" : ""}`
      );

    return parts.join(", ");
  }

  static toNepaliDigits(number) {
    const map = BsCalendar.nepaliDigits();
    return number
      .toString()
      .split("")
      .map((ch) => (/\d/.test(ch) ? map[ch] : ch))
      .join("");
  }
}

export default NepaliDateConverter;
