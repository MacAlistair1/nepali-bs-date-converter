import BsCalendar from "./BsCalendar.js";

/**
 * JS version of Jeeven Lamichhane's Official Logic
 * AD <-> BS Conversion (Gregorian <-> Bikram Sambat)
 */

export default class NepaliDateConverter {
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

    const refBSDays = this.totalDaysSince1970(
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
