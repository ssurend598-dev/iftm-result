# IFTM Result Portal - Demo/Unofficial

This is a static result-portal demo styled to match the supplied screenshots.

## Included
- `index.html` - result search page
- `style.css` - layout/style
- `app.js` - Excel lookup logic
- `data/results.xlsx` - uploaded Excel workbook
- `data/results.json` - fallback copy of the workbook data
- `assets/iftm-logo.png` - cropped logo from the supplied screenshot

## How it works
The browser loads `data/results.xlsx` using SheetJS and searches the selected year by Roll No. Registration No. and DOB are optional checks. If the Excel file cannot be read, the site uses `data/results.json`.

## Hosting
Upload the complete folder to a normal web host or GitHub Pages. Keep the folder structure unchanged.

This is intentionally marked DEMO / UNOFFICIAL and should not be presented as the official university result portal.
