# Nepali Date Converter (AD ↔ BS)

A lightweight JavaScript library for converting **Gregorian (AD)** dates to **Bikram Sambat (BS)** and vice versa. The library includes features for date validation, formatting, and various utility functions.

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

---

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