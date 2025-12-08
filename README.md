# Nepali Date Converter (AD ↔ BS)

A lightweight JavaScript library for converting **Gregorian (AD)** dates to **Bikram Sambat (BS)** and vice versa. The library includes features for date validation, formatting, and various utility functions.

---

## Features

### 1. **Convert AD to BS and BS to AD**
   - Easily convert between **Gregorian (AD)** and **Bikram Sambat (BS)** dates.
   - **`NepaliDateConverter.adToBs(adDate)`** – Converts a Gregorian date (AD) to the Nepali (BS) equivalent.
   - **`NepaliDateConverter.bsToAd(bsDate)`** – Converts a Nepali (BS) date to the Gregorian (AD) equivalent.

### 2. **Format Dates in English or Nepali**
   - Format dates in both **English (AD)** and **Nepali (BS)** with custom patterns.
   - **`NepaliDateConverter.formattedEnglishDate(adDate, format, locale)`** – Formats a Gregorian date in English.
   - **`NepaliDateConverter.formattedNepaliDate(bsDate, format, locale)`** – Formats a Nepali date in Nepali.
   - Supports a variety of placeholders (e.g., `Y`, `m`, `d`, `F`, `l`) for full flexibility in formatting.

### 3. **Get Today’s Date in AD or BS**
   - **`NepaliDateConverter.today(locale = 'en', format = 'Y-m-d')`** – Fetches today’s date, either in the **AD** (Gregorian) or **BS** (Nepali) format based on the locale.
   - Supports both **Nepali** and **English** locales for the date output.

### 4. **Date Difference Calculation**
   - **`NepaliDateConverter.diff(date1, date2, dateType = 'en', returnIn = null)`** – Calculates the difference between two dates in **years**, **months**, **days**, **hours**, **minutes**, or **seconds**.
   - Supports **Gregorian (AD)** and **Nepali (BS)** date types.

### 5. **Human-Readable Date Difference**
   - **`NepaliDateConverter.humanDiff(date1, date2, dateType = 'en', locale = 'en')`** – Returns the difference between two dates in a human-readable format (e.g., "5 years", "2 months, 3 days").
   - Output is available in **English** or **Nepali** based on the specified locale.

### 6. **Convert Numbers to Nepali Digits**
   - **`NepaliDateConverter.toNepaliDigits(number)`** – Converts numeric digits to their Nepali equivalents.
   - Useful for converting years, months, or any number into Nepali script.

### 7. **Date Validation**
   - **`NepaliDateConverter.isValidADDate(date)`** – Validates whether a given **Gregorian (AD)** date is correct.
   - **`NepaliDateConverter.isValidBSDate(date)`** – Validates whether a given **Nepali (BS)** date is correct.

### 8. **Utility Methods**
   - **`NepaliDateConverter.normalize(date, dateType = 'en')`** – Normalizes input dates into a consistent format for conversion or validation (works for both AD and BS).
   - **`NepaliDateConverter.digitToNepali(digit)`** – Converts a single numeric digit to its Nepali counterpart.

---

## Installation

### Using npm

    npm install nepali-bs-ad-date-converter

### Via CDN (For Browser Use)
For direct use in a web browser without a build step, include the UMD bundle script.  
Note: You must run a build tool (like Rollup or Webpack) to generate the dist/nepali-bs-ad-date-converter.umd.js file first.

<!-- After running your build step, assuming the file is available via a CDN -->
<script src="https://cdn.jsdelivr.net/npm/nepali-bs-ad-date-converter@1.0.0/dist/nepali-bs-ad-date-converter.umd.js"></script>
<script>
  // The class is exposed globally as NepaliDateConverter
  const converter = new NepaliDateConverter();
  const adDate = '2025-04-14';
  const bsDate = NepaliDateConverter.adToBs(adDate); 
  console.log(bsDate); // e.g., '2082-01-01'
</script>

---

## 🛠️ Usage

The library exposes the NepaliDateConverter class with various static methods for conversion, validation, and formatting. You generally do not need to instantiate the class, as all core methods are static.

### Module Import (Node.js / React / Vue)
    import NepaliDateConverter from 'nepali-bs-ad-date-converter';

    // AD → BS
    const bsDate = NepaliDateConverter.adToBs('2025-12-04');
    console.log(bsDate); // e.g., '2082-08-19'

    // BS → AD
    const adDate = NepaliDateConverter.bsToAd('2082-08-19');
    console.log(adDate); // '2025-12-04'

    // Validate dates
    console.log(NepaliDateConverter.isValidADDate('2025-12-04'));
    console.log(NepaliDateConverter.isValidBSDate('2082-08-19'));

    // Get detailed info
    console.log(NepaliDateConverter.getBSInfo('2082-08-19'));
    console.log(NepaliDateConverter.getADInfo('2025-12-04'));

    // Format Nepali date
    console.log(NepaliDateConverter.formattedNepaliDate('2082-08-19', 'd F, Y, l', 'np'));

    // Format English date
    console.log(NepaliDateConverter.formattedEnglishDate('2025-12-04', 'd F, Y, l', 'en'));

    // Get weekday
    console.log(NepaliDateConverter.weekdayAD('2025-12-04', 'en'));
    console.log(NepaliDateConverter.weekdayBS('2082-08-19', 'np'));

---

### Using via <script> (UMD)

    <script src="https://cdn.jsdelivr.net/npm/nepali-bs-ad-date-converter@1.0.0/dist/nepali-bs-ad-date-converter.umd.js"></script>
    <script>
      const bsDate = NepaliDateConverter.adToBs('2025-12-04');
      const adDate = NepaliDateConverter.bsToAd('2082-08-19');
      const formattedNep = NepaliDateConverter.formattedNepaliDate('2082-08-19', 'd F, Y, l', 'np');
      console.log(bsDate, adDate, formattedNep);
    </script>

---

### Example HTML Page

  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Nepali Date Converter Demo</title>
    </head>
    <body>
      <h1>Nepali Date Converter Demo</h1>
      <p id="demo"></p>

      <script src="https://cdn.jsdelivr.net/npm/nepali-bs-ad-date-converter@1.0.0/dist/nepali-bs-ad-date-converter.umd.js"></script>
      <script>
        const demoEl = document.getElementById('demo');

        const bsDate = NepaliDateConverter.adToBs('2025-12-04');
        const adDate = NepaliDateConverter.bsToAd('2082-08-19');
        const formattedNep = NepaliDateConverter.formattedNepaliDate('2082-08-19', 'd F, Y, l', 'np');

        demoEl.innerHTML = `
          <strong>AD → BS:</strong> ${bsDate} <br>
          <strong>BS → AD:</strong> ${adDate} <br>
          <strong>Formatted Nepali:</strong> ${formattedNep}
        `;
      </script>
    </body>
    </html>
  ```

---

### Other Utils

```html
<script>
  console.log(NepaliDateConverter.today('en'));              // English AD date
  console.log(NepaliDateConverter.today('np'));              // Nepali date (BS)
  console.log(NepaliDateConverter.today('np', 'd F, Y, l')); // Formatted BS

  const result = NepaliDateConverter.diff('2020-01-01', '2025-01-01');
  console.log(result);
  // {
  //   years: 5,
  //   months: 60,
  //   days: 1826,
  //   hours: 43824,
  //   minutes: 2629440,
  //   seconds: 157766400
  // }

  const diffBs = NepaliDateConverter.diff('2077-01-01', '2080-01-01', 'np');
  console.log(diffBs);

  const days = NepaliDateConverter.diff('2020-01-01', '2025-01-01', 'en', 'days');
  console.log(days); // 1826

  const human = NepaliDateConverter.humanDiff('2020-01-01', '2025-01-01');
  console.log(human); // "5 years"

  const humanNp = NepaliDateConverter.humanDiff('2077-01-01', '2080-01-01', 'np', 'np');
  console.log(humanNp); // "३ वर्ष"

  console.log(NepaliDateConverter.toNepaliDigits(2025)); // "२०२५"
  console.log(NepaliDateConverter.toNepaliDigits(987654)); // "९८७६५४"
</script>

```


## Available Methods

| Method | Description |
|--------|-------------|
| adToBs(adDate) | Convert AD to BS |
| bsToAd(bsDate) | Convert BS to AD |
| isValidADDate(adDate) | Validate AD date |
| isValidBSDate(bsDate) | Validate BS date |
| getADInfo(adDate) | Detailed AD date info |
| getBSInfo(bsDate) | Detailed BS date info |
| formattedNepaliDate(bsDate, format, locale) | Format BS date |
| formattedEnglishDate(adDate, format, locale) | Format AD date |
| weekdayAD(adDate, locale) | Weekday of AD date |
| weekdayBS(bsDate, locale) | Weekday of BS date |

---

## Supported Locales

| Locale | Description |
|--------|-------------|
| en | English |
| np | Nepali (digits, months, weekdays) |

---