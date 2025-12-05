# Nepali BS Date Converter

A robust JavaScript library for accurate conversion between the Gregorian (AD) and Bikram Sambat (BS) calendar systems, complete with Nepali localization and flexible date formatting.🚀

## Installation

### Using npm
npm install nepali-bs-date-converter

### Via CDN (For Browser Use)
For direct use in a web browser without a build step, include the UMD bundle script.  
Note: You must run a build tool (like Rollup or Webpack) to generate the dist/nepali-bs-date-converter.umd.js file first.

<!-- After running your build step, assuming the file is available via a CDN -->
<script src="https://cdn.jsdelivr.net/npm/nepali-bs-date-converter@1.0.0/dist/nepali-bs-date-converter.umd.js"></script>
<script>
  // The class is exposed globally as NepaliDateConverter
  const converter = new NepaliDateConverter();
  const adDate = '2025-04-14';
  const bsDate = NepaliDateConverter.adToBs(adDate); 
  console.log(bsDate); // e.g., '2082-01-01'
</script>

## 🛠️ Usage

The library exposes the NepaliDateConverter class with various static methods for conversion, validation, and formatting. You generally do not need to instantiate the class, as all core methods are static.

### Module Import (Node.js / React / Vue)
import NepaliDateConverter from 'nepali-bs-date-converter';

### AD to BS Conversion
const adToConvert = '2023-09-25';
const bsResult = NepaliDateConverter.adToBs(adToConvert);
console.log(`AD ${adToConvert} is BS ${bsResult}`); 
// Output: AD 2023-09-25 is BS 2080-09-08

### BS to AD Conversion
const bsToConvert = '2080-09-08';
const adResult = NepaliDateConverter.bsToAd(bsToConvert);
console.log(`BS ${bsToConvert} is AD ${adResult}`);
// Output: BS 2080-09-08 is AD 2023-09-25

### Nepali Formatting
Format a BS date in Nepali script: d, F Y, l (Day, Month Name, Year, Weekday)
const formattedNep = NepaliDateConverter.formattedNepaliDate(
    '2080-09-08', 
    'd F, Y, l', 
    'np'
);
// Output: ०८ पौष, २०८०, आईतवार
console.log(formattedNep);

### English Formatting (AD date, BS data)
Format an AD date using its corresponding BS date values but with English locale:
const formattedEn = NepaliDateConverter.formattedEnglishDate(
    '2023-09-25', 
    'Y-m-d l'
);
// Output: 2023-09-25 Monday
console.log(formattedEn);

### Full Date Information
The getBSInfo and getADInfo methods return detailed information about the date.
const info = NepaliDateConverter.getADInfo('2024-04-13');
/*
{
    ad: '2024-04-13',
    bs: '2080-12-31', // The last day of 2080 BS
    weekday: 'Saturday',
    total_days_in_year: 366, // 2080 BS was a 366-day year
    day_of_year: 366,
    diff_days_from_today: ...,
}
*/
